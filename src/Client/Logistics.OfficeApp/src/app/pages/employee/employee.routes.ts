import {Routes} from '@angular/router';
import {Permissions} from '@core/helpers';
import {AuthGuard} from '@core/guards';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';


export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListEmployeeComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'List',
      permission: Permissions.Employee.View,
    },
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Add',
      permission: Permissions.Employee.Create,
    },
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Edit',
      permission: Permissions.Employee.Edit,
    },
  },
];