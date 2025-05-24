import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormService } from '../form.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-returned-assets-list',
  templateUrl: './returned-assets-list.component.html',
  styleUrls: ['./returned-assets-list.component.css']
})
export class ReturnedAssetsListComponent {

  returnedAssets: any[] = [];
  private gridApi!: GridApi<any>;
  searchvalue : '';

   defaultColDef = { 
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: false,
  }

  paginationPageSize = 4
  paginationPageSizeSelector: number[] | boolean = [4, 10, 20, 25];

  columnDefs =[
      { field: 'employee', headerName: 'Employee Name', editable: false},
      { field: 'assetName', headerName: 'Asset Name'},
      { field: 'assetType', headerName: 'Asset Type'},
      { field: 'serialNumber', headerName: 'SerialNumber'},
      { field: 'issuedDate', headerName: 'IssuedDate'},
      { field: 'returnedDate', headerName: 'ReturnedDate'},
  ]

  constructor(public dialogRef:MatDialogRef<ReturnedAssetsListComponent>, 
              private formService:FormService
  ){}

  ngOnInit(){
      this.formService.getReturnedAssetsList().subscribe((data : any[]) => {
        this.returnedAssets =  data;
      })
  }

  gridOptions = {
    pagination: true,
    animateRows: true,
    enableFilter: true,
    suppressMenuHide: true,
    suppressColumnVirtualisation: true,
    suppressCellFocus: true,
  }

   onGridReady(event: GridReadyEvent<any>){
      this.gridApi = event.api;
    }

    saveDetails(){
      this.dialogRef.close();
    }

    onSearch() {
      const search = this.searchvalue.trim().toLowerCase();
      this.gridApi.setFilterModel({
        employee : search?{
          type: 'contains',
          filter: search
        }: null,
      });
    }

}
