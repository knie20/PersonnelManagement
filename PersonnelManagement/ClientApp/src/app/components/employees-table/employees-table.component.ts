import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/models';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnChanges{
  @Input() managerId: number = 0;
  displayedColumns = ['id', 'firstName', 'lastName'];
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService){}

  ngOnChanges(changes: SimpleChanges): void {
    for(let propName in changes){
      if(propName === 'managerId'){
        this.employeeService.getDirectReports(this.managerId)
          .subscribe(val => this.employees = val);
      }
    }
  }
}
