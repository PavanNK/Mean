import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  selectedEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }
  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }
}
