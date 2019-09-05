import { NgModule } from '@angular/core';
import {RouterModule, Routes } from "@angular/router";
import {EmployeesComponent} from "./employees/employees.component";
import {AddEmployeesComponent} from "./add-employees/add-employees.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/new', component: AddEmployeesComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
