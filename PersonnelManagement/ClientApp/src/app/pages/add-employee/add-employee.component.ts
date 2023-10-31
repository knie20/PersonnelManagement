import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { Employee, EmployeeRole, Role } from 'src/app/models';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  roleList: Role[] = [];
  selectedRoles: Role[] = [];
  selectedManagerId: number = 0;
  employeeList: Employee[] = [];

  newEmployeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService, 
    private fb: FormBuilder,
    private router: Router){
    this.newEmployeeForm = this.fb.group({
      fName: new FormControl({value: '', disabled: false}),
      lName: new FormControl({value: '', disabled: false}),
      reportsTo: new FormControl({value: 1, disabled: false}),
      roles: new FormControl({value: [], disabled: false})
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .subscribe(val => this.employeeList = val);
    this.employeeService.getAllRoles()
      .subscribe(val => this.roleList = val);
  }

  handleAddClick(){
    const firstName = this.newEmployeeForm.get('fName')?.value;
    const lastName = this.newEmployeeForm.get('lName')?.value;
    const reportsTo = this.newEmployeeForm.get('reportsTo')?.value;
    const roles = this.newEmployeeForm.get('roles')?.value;

    const newEmployee: Employee = {
      id: 0,
      firstName, lastName, reportsTo, role: []
    }

    this.employeeService.addEmployee(newEmployee)
      .subscribe(val => {
        const newEmployeeRoles = roles.map((r: Role) => ({
          employeeId: val,
          roleId: r.id
        }));
        this.employeeService.addEmployeeRole(newEmployeeRoles)
          .subscribe(next => this.router.navigate(['']));
      });
  }
}
