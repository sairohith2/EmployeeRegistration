import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../form.service';
import { TimesheetEntryDialogComponent } from '../timesheet-entry-dialog/timesheet-entry-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  //employee: any;
  employeeId: any;
  @Input() employee:any;
  openedFromDialog: boolean = false;
  

  constructor(private route: ActivatedRoute,
    private formService: FormService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef?: MatDialogRef<EmployeeDetailsComponent>

  ) {
    if (data && data.employee) {
      this.employee = data.employee;
      this.openedFromDialog = true;
    }
  }
  
  ngOnInit(): void {
    // this.employeeId = this.route.snapshot.paramMap.get('id') !;
    // this.formService.getEmployeeById((this.employeeId)).subscribe((data: any) => {
    //   this.employee = data;
    //   console.log("Employee Details",this.employee);
    // }
    // );
    if (!this.employee) {
      this.employeeId = this.route.snapshot.paramMap.get('id');
      if (this.employeeId) {
        this.formService.getEmployeeById(this.employeeId).subscribe((data: any) => {
          this.employee = data;
          console.log("Employee Details", this.employee);
        });
      }
    }
}

  fillTimesheet(){
    const dialogRef = this.dialog.open(TimesheetEntryDialogComponent, {
      width: '950px',
      height: '700px',
      data: { employee: this.employee }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Timesheet Data:', result);
      }
    });
  
  }

  closeDialog() {
    if (this.openedFromDialog) {
      this.dialogRef?.close(this.employee);
    }
    else {
      this.dialogRef?.close();
    }
  }


}
