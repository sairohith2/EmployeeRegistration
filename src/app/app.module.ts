import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterformComponent } from './registerform/registerform.component';
import { HttpClientModule } from '@angular/common/http';
import { TabledataComponent } from './tabledata/tabledata.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { TimesheetEntryDialogComponent } from './timesheet-entry-dialog/timesheet-entry-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgChartsModule } from 'ng2-charts';
import { DocumentsUploadComponent } from './documents-upload/documents-upload.component';
import { EmployeeFileUploadDialogComponent } from './employee-file-upload-dialog/employee-file-upload-dialog.component';
import { AssetComponent } from './asset/asset.component';
import { AssetformdialogComponent } from './assetformdialog/assetformdialog.component';
import { ReturnedAssetComponent } from './returned-asset/returned-asset.component';
import { ReturnedAssetsListComponent } from './returned-assets-list/returned-assets-list.component';
import { GitpractiseComponent } from './gitpractise/gitpractise.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterformComponent,
    TabledataComponent,
    LoginregisterComponent,
    DashboardComponent,
    SidebarComponent,
    LayoutComponent,
    TimesheetsComponent,
    EmployeeDetailsComponent,
    TimesheetEntryDialogComponent,
    DocumentsUploadComponent,
    EmployeeFileUploadDialogComponent,
    AssetComponent,
    AssetformdialogComponent,
    ReturnedAssetComponent,
    ReturnedAssetsListComponent,
    GitpractiseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    NgChartsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
