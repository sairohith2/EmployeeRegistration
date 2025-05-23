import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as Papa from 'papaparse';
import { FormService } from '../form.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFileUploadDialogComponent } from '../employee-file-upload-dialog/employee-file-upload-dialog.component';

@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.css']
})
export class DocumentsUploadComponent {
  
  previewUrl: SafeResourceUrl | null = null;

  private gridApi!: GridApi<any>;
  empData: any[] = [];

  constructor(private sanitizer: DomSanitizer, private router: Router, private fromService : FormService,
    private dailog: MatDialog
  ) {}

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
    { field: 'Files Uploaded',
      headerName: 'Files Uploaded',
      cellRenderer : () => {
        return `<button class="folder-icon" title="Upload Files"><i class="material-icons">folder</i></button>`;
      },
      onCellClicked: (params) => {
        this.openUploadDialog(params.data);
      }
    }
  ];
  


  defaultColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: true,
    menuTabs: [],
  };
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 20, 30, 50];
  
  gridOptions = {
    pagination: true,
    animateRows: true,
    enableFilter: true,
  };

  ngOnInit() {
    this.fromService.getGridData().subscribe({
      next: (data: any[]) => {
        this.empData = data;
        console.log("timesheet employee data",this.empData);
      }
    })
  }

  openUploadDialog(employee: any): void {
    this.dailog.open( EmployeeFileUploadDialogComponent,{
      width: '800px',
      height: '600px',
      data: { employee }
    })
  }

  onGridReady($event: GridReadyEvent<any,any>) {
    this.gridApi = $event.api;
    }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileType = file.type;
    const url = URL.createObjectURL(file);
    
    if (fileType === 'application/pdf') {
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      alert('Please upload a PDF file.');
      this.onReset();
    }
  }

  onReset(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      this.previewUrl = null;
    }
  }

 

}
