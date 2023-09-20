import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NgIf, CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ChartModule} from 'primeng/chart';
import {SkeletonModule} from 'primeng/skeleton';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {SharedModule} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {DailyGrosses, TruckGeolocation, Load} from '@core/models';
import {ApiService, LiveTrackingService} from '@core/services';
import {GeolocationMapComponent} from '@shared/components';
import {DistanceUnitPipe} from '@shared/pipes';
import {DateUtils, DistanceUtils} from '@shared/utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CardModule,
    SharedModule,
    GeolocationMapComponent,
    TableModule,
    RouterLink,
    TooltipModule,
    ButtonModule,
    NgIf,
    SkeletonModule,
    ChartModule,
    CurrencyPipe,
    DistanceUnitPipe,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  public todayGross: number;
  public weeklyGross: number;
  public weeklyDistance: number;
  public weeklyRpm: number;
  public loadingLoads: boolean;
  public loadingChart: boolean;
  public loads: Load[];
  public chartData: any;
  public chartOptions: any;
  public truksLocations: TruckGeolocation[];

  constructor(
    private apiService: ApiService,
    private liveTrackingService: LiveTrackingService)
  {
    this.truksLocations = [];
    this.loads = [];
    this.loadingLoads = false;
    this.loadingChart = false;
    this.todayGross = 0;
    this.weeklyGross = 0;
    this.weeklyDistance = 0;
    this.weeklyRpm = 0;

    this.chartData = {
      labels: [],
      datasets: [
        {
          label: 'Daily Gross',
          data: [],
        },
      ],
    },

    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }

  public ngOnInit() {
    this.fetchActiveLoads();
    this.fetchLastTenDaysGross();
    this.fetchTrucksData();
    this.connectToLiveTracking();
  }

  public ngOnDestroy(): void {
    this.liveTrackingService.disconnect();
  }

  private connectToLiveTracking() {
    this.liveTrackingService.connect();

    this.liveTrackingService.onReceiveGeolocationData = (data: TruckGeolocation) => {
      const index = this.truksLocations.findIndex((loc) => loc.truckId === data.truckId);

      if (index !== -1) {
        this.truksLocations[index] = data;
      }
      else {
        this.truksLocations.push(data);
      }
    };
  }

  private fetchTrucksData() {
    this.apiService.getTrucks('', '', 1, 100).subscribe((result) => {
      if (!result.success) {
        return;
      }

      const truckLocations: TruckGeolocation[] = result.items!.flatMap((truck) => {
        if (truck.currentLocation) {
          return [{
            latitude: truck.currentLocationLat!,
            longitude: truck.currentLocationLong!,
            truckId: truck.id,
            truckNumber: truck.truckNumber,
            driversName: `${truck.drivers[0].firstName} ${truck.drivers[0].lastName}`,
          }];
        }
        return [];
      });

      this.truksLocations = truckLocations;
    });
  }

  private fetchActiveLoads() {
    this.loadingLoads = true;

    this.apiService.getLoads('', true, '-dispatchedDate').subscribe((result) => {
      if (result.success && result.items) {
        this.loads = result.items;
      }

      this.loadingLoads = false;
    });
  }

  private fetchLastTenDaysGross() {
    this.loadingChart = true;
    const oneWeekAgo = DateUtils.daysAgo(7);

    this.apiService.getDailyGrosses(oneWeekAgo).subscribe((result) => {
      if (result.success && result.value) {
        const grosses = result.value;

        this.weeklyGross = grosses.totalIncome;
        this.weeklyDistance = grosses.totalDistance;
        this.weeklyRpm = this.weeklyGross / DistanceUtils.metersTo(this.weeklyDistance, 'mi');
        this.drawChart(grosses);
        this.calcTodayGross(grosses);
      }

      this.loadingChart = false;
    });
  }

  private drawChart(grosses: DailyGrosses) {
    const labels: Array<string> = [];
    const data: Array<number> = [];

    grosses.dates.forEach((i) => {
      labels.push(DateUtils.toLocaleDate(i.date));
      data.push(i.income);
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Daily Gross',
          data: data,
          fill: true,
          tension: 0.4,
          borderColor: '#405a83',
          backgroundColor: '#88a5d3',
        },
      ],
    };
  }

  private calcTodayGross(grosses: DailyGrosses) {
    const today = new Date();
    let totalGross = 0;

    grosses.dates
        .filter((i) => DateUtils.getDate(i.date) === today.getDate())
        .forEach((i) => totalGross += i.income);

    this.todayGross = totalGross;
  }
}