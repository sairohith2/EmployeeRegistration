import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginregisterComponent } from './app/loginregister/loginregister.component';
import { RegisterformComponent } from './app/registerform/registerform.component';
import { TabledataComponent } from './app/tabledata/tabledata.component';
import { LayoutComponent } from './app/layout/layout.component';
import { TimesheetsComponent } from './app/timesheets/timesheets.component';
import { EmployeeDetailsComponent } from './app/employee-details/employee-details.component';
import { DocumentsUploadComponent } from './app/documents-upload/documents-upload.component';
import { AssetComponent } from './app/asset/asset.component';
import { AuthGuard } from './app/auth.guard';


// const routes: Routes = [
//   { path: '', component: LoginregisterComponent },
//   { path: 'login', component: LoginregisterComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'enroll', component: RegisterformComponent },
//   { path: 'emplist', component: TabledataComponent },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginregisterComponent },

  {
    path: '',
    component: LayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: DashboardComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'enroll', component: RegisterformComponent },
      { path: 'emplist', component: TabledataComponent },
      { path: 'timesheet', component: TimesheetsComponent},
      { path: 'employee/:id', component: EmployeeDetailsComponent },
      { path: 'documentsupload', component: DocumentsUploadComponent },
      { path: 'asset', component:  AssetComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
