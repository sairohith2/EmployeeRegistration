import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 constructor(private http: HttpClient) { }

 private apiUrl = 'http://localhost:3000/users';

  registerUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  loginUser(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
  
  checkEmailExists(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }
  

}
