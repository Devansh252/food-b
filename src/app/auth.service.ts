import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  createUser(data: any) {
    this.http
      .post('http://localhost:3000/user/signup', data)
      .subscribe((response) => {
        console.log(response);
      });

    // localStorage.setItem('userData', data);
    // localStorage.setItem(
    //   'accessToken',
    //   'ad1a32f1a3fw5tgfa4faf51ad1ad1dqed54adas'
    // );
  }

  loginUser(data: any) {
    return this.http.post('http://localhost:3000/user/login', data);
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
