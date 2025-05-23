import { Component, Optional, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { AssetformdialogComponent } from '../assetformdialog/assetformdialog.component';
import { FormService } from '../form.service';
import { filter } from 'rxjs';
import { CellRendererComponent } from 'ag-grid-community/dist/types/core/components/framework/componentTypes';
import { ReturnedAssetComponent } from '../returned-asset/returned-asset.component';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {

  assignedAssets: any[] = [];
  private gridApi!: GridApi<any>;
  assetEmps: any[] = [];
  searchvalue : string = '';
  matchedEmployee : any = null;

  defaultColDef = { 
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: true,
    menuTabs: [],
  }

  paginationPageSize = 10
  paginationPageSizeSelector: number[] | boolean = [10, 20, 30, 50];

  constructor(private dialog: MatDialog, private formService:  FormService,
  ){}

  columnDefs = [
    { field: 'employee', headerName: 'Employee Name', sortable: true, filter: true },
    { field: 'assetName', headerName: 'AssetName', sortable: true, filter: true},
    { field: 'assetType', headerName:'AssetType', sortable: true, filter: true},
    { field: 'serialNumber',headerName: 'SerialNumber', sortable: true, filter:true},
    { field: 'issuedDate', headerName:'IssuedDate',  sortable: true, filter: true},
    { field: 'returned', 
      headerName: 'Return Asset',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: {
       values: ['Yes','No']
      },
      cellRenderer: (params: any) => {
        const returned = params.value || '';
        let color = '';
        switch (returned.toLowerCase()) {
          case 'yes':
            color = '#FFB74D';
            break;
          case 'no':
            color = '#AED581';
            break;
        }
        return `<span class="status-badge" 
                      style="background-color: ${color}; 
                             padding: 2px 6px; 
                             border-radius: 4px; 
                             font-weight: bold; 
                             font-size: 13px;">
                  ${returned.toUpperCase()}
                </span>`;
      },
      onCellValueChanged: (params: any) => {
        if (params.newValue && params.newValue.toLowerCase() === 'yes') {
          console.log("Dialog yes fired");
          this.dialog.open(ReturnedAssetComponent,{
            width:'800px',
            height: '400px',
            data: { employee: params.data}
          }).afterClosed().subscribe((result: any) => {
            if(result === 'cancel'){{
              params.node.setDataValue('returned','No');
            }} else if (result === 'confirm') {
                const assetId = params.data.id;
                this.formService.deleteAssetData(assetId).subscribe({
                  next: () => {
                    this.gridApi.applyTransaction({ remove: [params.data]});
                    alert("Asset Returned");
                  },
                  error: (err) => {
                    console.error("Error deleting asset",err);
                    alert("Failed to delete asset");
                  }
                })
            }
          })
        }
      }
    }
  ]

  gridColumnApi: any;

    ngOnInit(){
     this.formService.getAssetData().subscribe((data: any[]) => {
      this.assetEmps = data;
      console.log('assetEmp', this.assetEmps);
    });
    }

   gridOptions = {
    pagination: true,
    animateRows: true,
    enableFilter: true,
    suppressMenuHide: true,
    suppressColumnVirtualisation: true,
    suppressCellFocus: true,
    context: { componentParent: this }
  }

  openDialog(){
    const dialogRef = this.dialog.open(AssetformdialogComponent,{
       width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.formService.getAssetData().subscribe((data: any[]) => {
        this.assetEmps = data;
      });
    })
  }

  onGridReady(event: GridReadyEvent<any>){
    this.gridApi = event.api;
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
  saveDetails(){
    const updateData : any[] = [];
    this.gridApi.forEachNode((node)=>{
        if(node.data){
          updateData.push(node.data);
        }
    });

    this.formService.updateAssetData(updateData).subscribe((res)=>{
        alert("Saved SuccessFully !!");
    })
  }

  returnedAssets(){
    
  }

}
