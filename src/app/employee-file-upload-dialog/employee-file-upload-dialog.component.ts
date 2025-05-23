import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../form.service';

@Component({
  selector: 'app-employee-file-upload-dialog',
  templateUrl: './employee-file-upload-dialog.component.html',
  styleUrls: ['./employee-file-upload-dialog.component.css']
})
export class EmployeeFileUploadDialogComponent implements OnInit {
  
  uploadedFiles: File[] = [];
  employeeId: string = '';
  employeeName: string = '';
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EmployeeFileUploadDialogComponent>,
  private formService: FormService

) {
    this.employeeId = data?.employee?.id;
    this.employeeName = data?.employee?.firstname;
  }
 
  ngOnInit(): void {
    const saved = localStorage.getItem(`files_${this.employeeId}`);
    if (saved) {
      this.uploadedFiles = JSON.parse(saved);
    }
    console.log('Saved files:', this.uploadedFiles);
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.uploadedFiles.push(...Array.from(files)); 
    if (this.uploadedFiles.length > 3) {
      alert('You can only upload a maximum of 3 files');
      this.dialogRef.close();
    }
    console.log('Uploaded files:', this.uploadedFiles);
  }

  closeDialog(): void {
     this.dialogRef.close();
  }

  saveDetails(): void {
    console.log('Employee ID:', this.employeeId, 'Employee Name:', this.employeeName);
    localStorage.setItem(`files_${this.employeeId}`, JSON.stringify(this.uploadedFiles));
  this.formService.saveFiles(this.employeeId, this.employeeName, this.uploadedFiles)
  .subscribe(
      res => {
        console.log('Uploaded successfully', res);
        alert('Files uploaded successfully');
        this.dialogRef.close();
      }
    );
  }
  
}
