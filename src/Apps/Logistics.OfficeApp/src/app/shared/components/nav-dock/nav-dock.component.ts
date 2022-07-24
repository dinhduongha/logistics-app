import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-dock',
  templateUrl: './nav-dock.component.html',
  styleUrls: ['./nav-dock.component.scss']
})
export class NavDockComponent implements OnInit {
  dockItems!: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.dockItems = [
      {
        label: 'Dashboard',
        icon: 'assets/icons/home.svg',
        link: 'dashboard',
      },
      {
        label: 'Loads',
        icon: 'assets/icons/delivery-container.svg',
        link: 'list-load',
      },
      {
        label: 'Drivers',
        icon: 'assets/icons/delivery-truck.svg',
        link: 'list-truck',
      },
      {
        label: 'Employees',
        icon: 'assets/icons/users.svg',
        link: 'list-employee',
      }
    ];

  }

}

type MenuItem = {
  label: string;
  icon: string;
  link: string;
}
