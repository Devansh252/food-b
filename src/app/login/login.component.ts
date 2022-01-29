import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  isLoading = false;
  formValid = false;
  public showPassword: boolean = false;
  ngOnInit(): void {}
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(form: NgForm) {
    if (
      form.value.email == 'devansh@admin.in' &&
      form.value.password == 'qwerty'
    ) {
      this.authService.createUser(0);
      this.router.navigate(['/']);
      console.log(form.value);
    }
    if (
      form.value.email == 'devansh@gmail.com' &&
      form.value.password == 'qwerty'
    ) {
      this.authService.createUser(1);
      this.router.navigate(['/']);
      console.log(form.value);
    }
    if (form.value.email) this.formValid = true;
  }
}
