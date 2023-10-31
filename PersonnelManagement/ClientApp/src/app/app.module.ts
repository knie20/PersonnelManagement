import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { EmployeeService } from './employee.service';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ManagersComponent,
    AddEmployeeComponent,
    EmployeesTableComponent,
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'managers'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ManagersComponent, pathMatch: 'full' },
      { path: 'add', component: AddEmployeeComponent}
    ]),
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
