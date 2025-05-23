import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, switchMap } from 'rxjs';
import { Timesheet, TimesheetEntry } from './timesheet';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:3000/submissions';

  private baseUrl = 'http://localhost:3000';

  private filesUrl = 'http://localhost:3000/filesUploaded';

  private assetUrl =  'http://localhost:3000/assetEmps';

  private returnAssetsUrl = 'http://localhost:3000/returnedAssets'

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

  saveFiles(employeeId: string, employeeName: string, files: File[]): Observable<any> {
    const validFiles = files.filter(file => file instanceof File);

    const fileDataArray = validFiles.map(file => ({
      fileName: file.name,
      type: file.type,
      employeeId: employeeId,
      employeeName: employeeName
    }));

    return from(Promise.resolve(fileDataArray)).pipe(
      switchMap(dataArray => {
        const requests = dataArray.map(file =>
          this.http.post(this.filesUrl, file)
        );
        return forkJoin(requests);
      })
    );

  }

  submitAsset(data : any){
    return this.http.post(this.assetUrl, data);
  }

  getAssetData(): Observable<any[]> {
    return this.http.get<any[]>(this.assetUrl);
  }

  updateAssetData(data:any){
    const updaterow = data.map(row =>
      this.http.put(`${this.assetUrl}/${row.id}`, row)
    );
    return forkJoin(updaterow);
  }

  deleteAssetData(id: number){
    return this.http.delete(`${this.assetUrl}/${id}`);
  }

  submitReturnAssets(data:any){
      return this.http.post(this.returnAssetsUrl, data);
  }
}

