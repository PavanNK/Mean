import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../employee";
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {EmployeeService} from "../employee.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  employeeForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  onUpdateEmployee() {
    console.log('i am here');
    const {name, age, email} = this.employeeForm.value;
    console.log('what is value', this.employeeForm.value);
    console.log('employee', this.employee);
    this.employeeService.updateEmployee(this.employee.id, {name, age, email});
    this.router.navigate(['/employees']);
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

}
