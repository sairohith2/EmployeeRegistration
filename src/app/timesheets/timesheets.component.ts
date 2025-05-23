import { Component } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormService } from '../form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent {


showHolidayPopup = false;
  
 private gridApi!: GridApi<any>;
  empData : any [] = [];
  defaultColDef ={
    flex:1,
    minWidth:100,
    filter: true,
    editable: true
  }
paginationPageSize: 10;
paginationPageSizeSelector: number[] | boolean = [10, 20, 30,50];

  constructor(private formService: FormService, private router: Router) { }

  columnDefs = [
    {
      field: 'firstname',
      headerName: 'First Name',
      cellRenderer: (params: any) => {
        return `<a class="link-style">${params.value}</a>`;
      },
      onCellClicked: (event: any) => {
        this.router.navigate(['/employee', event.data.id]);
      }
    },
    { field: 'lastname', headerName:'Last Name', sortable: true, filter: true },
  ]

  ngOnInit() {
    this.formService.getGridData().subscribe((data: any[]) => {
      this.empData = data;
      console.log("timesheet employee data",this.empData);
    });
  }
  gridOptions ={
    pagination: true,
    animateRows: true,
    enableFilter: true, 
  }

  onGridReady(event: GridReadyEvent<any>){
      this.gridApi =  event.api;
  }

  upcomingHolidays = [
  { date: new Date('2025-05-20'), name: 'Summer Holidays' },
  { date: new Date('2025-06-02'), name: 'Company Annual Day' },
  { date: new Date('2025-06-14'), name: 'School Repoms'}
];

toggleHolidayPopup() {
  this.showHolidayPopup = !this.showHolidayPopup;
}
}
