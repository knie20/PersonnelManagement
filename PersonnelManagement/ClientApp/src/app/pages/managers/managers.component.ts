import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/models';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit{
  managerList: Employee[] = [];
  directReports: Employee[] = [];
  selectedManagerId: number = 0;
  
  constructor(private employeeService: EmployeeService, private router: Router){}

  ngOnInit(): void {
    this.employeeService.getManagers()
      .subscribe(val => this.managerList = val);
  }
  
  handleAddEmployeeClick(){
    this.router.navigate(['add']);
  }
}
