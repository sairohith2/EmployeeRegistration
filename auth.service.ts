import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  getRole(): string {
    return this.getUser()?.role || '';
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
