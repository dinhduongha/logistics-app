import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Permissions} from '@core/helpers';
import {AuthGuard} from '@core/guards';
import {TruckDashboardComponent} from './truck-dashboard/truck-dashboardcomponent';
import {MainDashboardComponent} from './main-dashboard/main-dashboardcomponent';

const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Main',
      permission: Permissions.Report.View,
    },
  },
  {
    path: 'truck/:id',
    component: TruckDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Truck',
      permission: Permissions.Report.View,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(rootRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}