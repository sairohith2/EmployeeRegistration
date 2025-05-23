import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { GridApi } from 'ag-grid-community';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  user: any;
  employees: any[] = [];
  searchText = '';
  private gridApi!: GridApi<any>;
  searchValue: string = '';
  matchedEmployee: any = null;
  showPopup: boolean = false;

  total = 0;
  active = 0;
  inactive = 0;
  managers = 0;
  employeesCount = 0;

  constructor(private router: Router, private formService: FormService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    console.log('storedUser:', storedUser);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.formService.getGridData().subscribe((data: any) => {
      this.employees = data;
      this.calculateStats();
    });
  }

  calculateStats(): void {
    this.active = 0;
    this.inactive = 0;
    this.total = this.employees.length;

    this.active = this.employees.filter(e => e.status === 'Active').length;
    this.inactive = this.total - this.active;

    this.managers = this.employees.filter(e => e.role === 'Manager').length;
    this.employeesCount = this.employees.filter(e => e.role === 'Employee').length;
  }
  
  onSearch() {
    const search = this.searchValue.trim().toLowerCase();
    if (!search) return;
  
    this.matchedEmployee = this.employees.find(emp =>
      (emp.firstname && emp.firstname.toLowerCase() === search) ||
      (emp.lastname && emp.lastname.toLowerCase() === search) ||
      (emp.email && emp.email.toLowerCase() === search) 
    );
  
    if (this.matchedEmployee) {
      this.openDialog(this.matchedEmployee);
      this.onReset();
    } else {
      alert('No employee found.');
      this.onReset();
    }
  }
  
  openDialog(employee: any): void {
    this.dialog.open(EmployeeDetailsComponent, {
      width: '700px',
      height: '600px',
      data: { employee}
    });
  }

  onReset() {
    this.searchValue = '';
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    alert('Logout successful');
  }
}
