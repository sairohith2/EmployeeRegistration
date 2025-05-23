import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../form.service';

@Component({
  selector: 'app-assetformdialog',
  templateUrl: './assetformdialog.component.html',
  styleUrls: ['./assetformdialog.component.css']
})
export class AssetformdialogComponent {

  searchValue: string = '';
  employeeNotFound = false;

  constructor(public dialogRef: MatDialogRef<AssetformdialogComponent>, private http: HttpClient,
    private formService: FormService
  ) { }

  form = {
    assetName: '',
    assetType: '',
    serialNumber: '',
    employee: '',
    issuedDate: '',
  };

  onSearch() {
    const searchTerm = this.form.employee.trim().toLowerCase();
   // const searchTerm = this.searchValue.trim().toLowerCase();
    this.formService.getGridData().subscribe((data: any[]) => {
      const found = data.find(emp =>
        emp.firstname?.toLowerCase().includes(searchTerm) ||
        emp.lastname?.toLowerCase().includes(searchTerm) ||
        `${emp.firstname} ${emp.lastname}`.toLowerCase().includes(searchTerm)
      );

      if (found) {
        this.form.employee = `${found.firstname} ${found.lastname}`;
        this.employeeNotFound = false;
      } else {
        alert("Employee Not found");
        this.form.employee = '';
      }
    });
  }

  submitForm() {
    this.formService.submitAsset(this.form).subscribe((res) => {
      const info = confirm("From Submitted!!Do you  want to submit another Asset?");
      if (info) {
        this.newForm();
      }
      else {
        this.dialogRef.close();
      }
    })
  }

  newForm() {
    this.form.employee = '';
    this.form = {
      assetName: '',
      assetType: '',
      serialNumber: '',
      employee: '',
      issuedDate: '',
    };
  }

  cancel() {
    this.dialogRef.close();
  }
}
