import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { EMPLOYEES } from "./mock-employees";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList: Employee[];

  constructor() {
    this.employeeList = EMPLOYEES;
  }

  addEmployee(employee: Employee): void {
    this.employeeList.push(employee);
  }
  updateEmployee(id: number, updates: {}): void {
    let employee = this.employeeList.find(employee => employee.id === id);
    for (const update in updates) {
      if (!!updates[update]) {
        employee[update] = updates[update];
      }
    }
  }

  getMaxID(): number {
    const ids = this.employeeList.map(s => s.id);
    return Math.max(...ids);
  }

  getEmployees(): Employee[] {
    console.log('employeeList', this.employeeList);
    return this.employeeList;
  }

  getEmployee(id: number): Observable<Employee> {
    return of(this.employeeList.find(employee => employee.id === id));
  }
}
