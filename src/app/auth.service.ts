import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  createUser(userId: any) {
    localStorage.setItem('userId', userId);
    localStorage.setItem(
      'accessToken',
      'ad1a32f1a3fw5tgfa4faf51ad1ad1dqed54adas'
    );
  }

  getUser() {
    return localStorage.getItem('userId');
  }
  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
