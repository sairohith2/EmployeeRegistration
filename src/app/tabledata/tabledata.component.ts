import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormService } from '../form.service';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as Papa from 'papaparse';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.css']
})
export class TabledataComponent {

  searchText = '';
  selectedStatus = '';
  selectedRole = '';
  showSaveMessage = false;
  showRemoveMessage = false;
  previewData: any[] = [];
  showOtherBackground: boolean;


  @ViewChild('csvInput') csvInput!: ElementRef;
  
  private gridApi!: GridApi<any>;
  formData: any[] = [];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: true,
    menuTabs: [],
  }
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 20, 30, 50];

  columnDefs = [
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'username', headerName: 'UserName', sortable: true, filter: true },
    { field: 'dob', headerName: 'Date of Birth', sortable: true, filter: true },
    { field: 'address.phone', headerName: 'Phone Number', sortable: true, filter: true },
    { field: 'dateOfJoining', headerName: 'Date of Joining', sortable: true, filter: true },
    { field: 'experienceYears', headerName: 'Experience Years', sortable: true, filter: true },
    {
      field: 'backgroundExp',
      headerName: 'Background Experience',
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['IT', 'ECE', 'CIVIL', 'Mechanical', 'Other']
      },
      cellRenderer: (params: any) => {
        const backgroundExp = params.value || '';
        const otherBackground = params.data?.otherBackground || '';
        return backgroundExp === 'Other' ? otherBackground : backgroundExp;
      }
    },
    {
      headerName: 'Address Details',
      children: [
        { columnGroupShow: "closed" },
        { columnGroupShow: "open", field: 'address.street', headerName: 'Street', sortable: true, filter: true },
        { columnGroupShow: "open", field: 'address.country', headerName: 'Country', sortable: true, filter: true },
        { columnGroupShow: "open", field: 'address.city', headerName: 'City', sortable: true, filter: true },
        { columnGroupShow: "open", field: 'address.postal', headerName: 'Postal Code', sortable: true, filter: true },
      ]
    },
    {
      field: 'status',
      headerName: 'Status',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: {
        values: ['Active', 'Inactive'],
      },
      cellRenderer: (params: any) => {
        const status = (params.value || '').toLowerCase();
        let color = '#f44336';
        if (status === 'active') color = '#4caf50';

        return `<span class="status-badge" style="background-color: ${color};">${status.toUpperCase()}</span>`;
      }
    },
    {
      field: 'role',
      headerName: 'Role',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: {
        values: ['Manager', 'Employee']
      },
      cellRenderer: (params: any) => {
        const role = params.value || '';
        let color = '';
    
        switch (role.toLowerCase()) {
          case 'manager':
            color = '#FFB74D';
            break;
          case 'employee':
            color = '#AED581';
            break;
        }
        return `<span class="status-badge" 
                      style="background-color: ${color}; 
                             padding: 2px 6px; 
                             border-radius: 4px; 
                             font-weight: bold; 
                             font-size: 13px;">
                  ${role.toUpperCase()}
                </span>`;
      }
    }

  ]
  gridColumnApi: any;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formService.getGridData().subscribe((data: any[]) => {
      this.formData = data;
      console.log('FormData loaded:', this.formData); // Debugging log
    });
    this.fetchEmployees();
  }

  gridOptions = {
    pagination: true,
    animateRows: true,
    enableFilter: true,
    suppressMenuHide: true,
    suppressColumnVirtualisation: true,
    suppressCellFocus: true,
  }


  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
    console.log('Grid API initialized:', this.gridApi); // Debugging log
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const idsToDelete = selectedData.map(data => data.id);
    console.log(idsToDelete);
    idsToDelete.forEach(id => {
      this.formService.deleteRow(id).subscribe(response => {
        this.gridApi.applyTransaction({ remove: selectedData });
      });
    });
    this.showRemoveMessage = true;
    setTimeout(() => {
      this.showRemoveMessage = false;
    }
      , 4000);
  }

  saveDetails() {
    const updatedData: any[] = [];
    this.gridApi.forEachNode(node => {
      if (node.data) {
        updatedData.push(node.data);
      }
    });

    this.formService.saveUpdatedData(updatedData).subscribe(response => {
      console.log('Data saved successfully', response);
      alert('Employee Status Updated Successfully');
    });
    this.showSaveMessage = true;
    setTimeout(() => {
      this.showSaveMessage = false;
    }, 4000);
  }

  exportToCSV() {
    const params = {
      fileName: 'grid-data.csv',
      allColumns: true,
      onlySelected: false,
    };
    this.gridApi.exportDataAsCsv(params);
  }

  onStatusFilterChange() {
    this.gridApi.setFilterModel({
      status: this.selectedStatus ? {
        type: 'equals',
        filter: this.selectedStatus
      } : null
    });
    this.gridApi.onFilterChanged();
  }

  onRoleFilterChange(){
    this.gridApi.setFilterModel({
      role: this.selectedRole ? {
        type: 'equals',
        filter: this.selectedRole
      } : null
    });
    this.gridApi.onFilterChanged();
  }

  onSearchTextChange() {
    const searchText = this.searchText.toLowerCase();
    console.log('Search text changed:', searchText); 
    this.gridApi.setFilterModel({
      firstname: searchText ? {
        type: 'contains',
        filter: searchText
      } : null
    });
    this.gridApi.setFilterModel({
      lastname: searchText? {
        type: 'contains',
        filter: searchText
      }: null
    })
  }
  

  onFileUpload(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        // transformHeader: (header) => header.trim().toLowerCase(),
        complete: (result) => {
          console.log('Parsed CSV:', result.data);
          this.previewData = result.data;
        }
      });
    }
  }

  fetchEmployees() {
    this.formService.getGridData().subscribe((data: any[]) => {
      this.formData = data;
      console.log("FormData", this.formData);
    });
  }
  importEmployees() {
   console.log('Importing employees:', this.previewData);
    const validData = this.previewData.filter(emp =>
      emp.Firstname && emp.Lastname && emp.Email && emp.Username && emp.Dob && emp.Phone
    );
  
    const requests = validData.map(employee => {
      const employeeData = {
        firstname: employee.Firstname,
        lastname: employee.Lastname,
        email: employee.Email,
        username: employee.Username,
        dob: employee.Dob,
        phone: employee.Phone
      };
  
      return this.formService.bulkAddEmployees(employeeData);
    });
  
    forkJoin(requests).subscribe({
      next: () => {
        console.log('All employees saved');
        this.fetchEmployees(); 
        this.previewData = [];
        this.csvInput.nativeElement.value = '';
        alert('Data imported successfully');
      },
      error: err => {
        console.error('One or more requests failed', err);
      }
    });
    }
    

  cancelCSVPreview() {
    this.previewData = [];
    this.csvInput.nativeElement.value = '';
  }

}
