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
  result: any;
  public showPassword: boolean = false;
  ngOnInit(): void {}
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(form: NgForm) {
    if (form.value.email == 'devansh@admin.in') {
      localStorage.setItem('userId', '0');
    }

    this.authService.loginUser(form.value).subscribe(
      (data: any) => {
        this.result = data;
        localStorage.setItem('accessToken', data.token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.formValid = true;
      }
    );
  }
}
