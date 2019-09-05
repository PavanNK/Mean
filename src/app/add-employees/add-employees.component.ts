import {Component, OnInit} from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {
  employeeForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  onAddEmployee(): void {
    const {name, age, email} = this.employeeForm.value;
    const id = this.employeeService.getMaxID() + 1;
    const employee = new Employee(id, name, age, email);
    this.employeeService.addEmployee(employee);
    this.router.navigate(['/employees']);
  }
  ngOnInit() {
  }
}
