import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../form.service';
import { Timesheet } from '../timesheet';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-timesheet-entry-dialog',
  templateUrl: './timesheet-entry-dialog.component.html',
  styleUrls: ['./timesheet-entry-dialog.component.css']
})
export class TimesheetEntryDialogComponent implements OnInit {

  private gridApi!: GridApi<any>;


  timesheetId: number | null = null;
  timesheetData: any[] = [];
  hourlyRate = 0;

  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<TimesheetEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.loadTimesheet();
  }

  loadTimesheet() {
    this.formService.getTimesheet(this.data.employee.id).subscribe((res) => {
      if (res.length > 0) {
        this.timesheetId = res[0].id;
        this.timesheetData = res[0].entries;
        this.hourlyRate = res[0].hourlyRate;
      } else {
        this.initTimesheet();
      }
    });
  }

  initTimesheet() {
    const dates: any[] = [];
    const current = new Date(this.startDate);
    while (current <= this.endDate) {
      dates.push({
        date: new Date(current),
        timeIn: '',
        timeOut: '',
        breakHrs: 0,
        breakMins: 0,
        totalHours: 0,
      });
      current.setDate(current.getDate() + 1);
    }
    this.timesheetData = dates;
  }

  calculate(row: any) {
    if (row.timeIn && row.timeOut) {
      const start = new Date(`2000-01-01T${row.timeIn}`);
      const end = new Date(`2000-01-01T${row.timeOut}`);
      const breakTime = (row.breakHrs || 0) + (row.breakMins || 0) / 60;
      const worked = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      row.totalHours = Math.max(0, worked - breakTime);
    }
  }

  getTotalHours(): number {
    return this.timesheetData.reduce((total, row) => total + (row.totalHours || 0), 0);
  }

  onSubmit() {
    const payload = {
      employeeId: this.data.employee.id,
      hourlyRate: this.hourlyRate,
      entries: this.timesheetData
    };

    if (this.timesheetId) {
      this.formService.updateTimesheet(this.timesheetId, payload).subscribe(() => {
        alert('Timesheet updated');
        this.dialogRef.close();
      });
    } else {
      this.formService.submitTimesheet(payload).subscribe(() => {
        alert('Timesheet submitted');
        this.dialogRef.close();
      });
    }
  }

  

  onCancel() {
    this.dialogRef.close();
  }
  exportToCSV() {
    const params = {
      fileName: 'grid-data.csv',
      allColumns: true,
      onlySelected: false,
    };
    this.gridApi.exportDataAsCsv(params);
  }
}
