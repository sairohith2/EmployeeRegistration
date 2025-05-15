import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Timesheet, TimesheetEntry } from './timesheet';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl =  'http://localhost:3000/submissions';

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  submitForm(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getGridData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveUpdatedData(data: any[]) {
    const updateRequests = data.map(row =>
      this.http.put(`${this.apiUrl}/${row.id}`, row)
    );
    return forkJoin(updateRequests); 
  }

  deleteRow(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Submit or update timesheet
// submitTimesheet(timesheet: any) {
//   const { employeeId, period } = timesheet;
//   return this.http.get<any[]>(`http://localhost:3000/timesheets?employeeId=${employeeId}&period.start=${period.start}`)
//     .pipe(
//       switchMap(existing => {
//         if (existing.length > 0) {
//           // Update
//           const existingSheet = existing[0];
//           return this.http.put(`http://localhost:3000/timesheets/${existingSheet.id}`, { ...existingSheet, ...timesheet });
//         } else {
//           // Create
//           return this.http.post(`http://localhost:3000/timesheets`, timesheet);
//         }
//       })
//     );
// }

// getTimesheet(employeeId: number, start: string, end: string): Observable<any> {
//   return this.http.get<any[]>(`http://localhost:3000/timesheets?employeeId=${employeeId}&period.start=${start}&period.end=${end}`);
// }


getTimesheet(employeeId: number): Observable<Timesheet[]> {
  return this.http.get<Timesheet[]>(`${this.baseUrl}/timesheets?employeeId=${employeeId}`);
}

submitTimesheet(data: any) {
  return this.http.post<Timesheet>(`${this.baseUrl}/timesheets`, data);
}

updateTimesheet(id: number, data: any) {
  return this.http.put<Timesheet>(`${this.baseUrl}/timesheets/${id}`, data);
}

bulkAddEmployees(data: any) {
  return this.http.post(this.apiUrl, data); 
}


}
