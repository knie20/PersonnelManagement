import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeRole, Role } from './models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  base: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + 'api/employees/';
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.base}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.base}roles`);
  }

  getManagers = (): Observable<Employee[]> => {
    return this.http.get<Employee[]>(`${this.base}managers`);
  }

  getDirectReports = (managerId: number): Observable<Employee[]> => {
    return this.http.get<Employee[]>(`${this.base}directreports/${managerId}`);
  }

  addEmployee = (employee: Employee): Observable<number> => {
    return this.http.post<number>(`${this.base}`, employee);
  }

  addEmployeeRole = (employeeRoles: EmployeeRole[]): Observable<void> => {
    return this.http.post<void>(`${this.base}employeerole`, employeeRoles);
  }
}
