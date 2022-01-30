import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  admin: boolean = false;
  displayStyle = 'none';
  enteredTitle = '';
  enteredContent = '';
  public totalItem: number = 0;

  isLoading = false;
  item: object = {};
  constructor(
    public authService: AuthService,
    private service: ServicesService,
    private _snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  onSubmitItem(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      console.log(form.value.category);
      this.item = {
        name: form.value.name,
        image: form.value.image,
        price: form.value.price,
        category: form.value.category,
        description: form.value.description,
      };
      this.service.postItems(this.item).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar();
      });
    }

    form.resetForm();
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
    if (this.authService.getUser() == '0') this.admin = true;
  }
  logout() {
    this.authService.logout();
  }

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
    window.location.reload();
  }

  openSnackBar() {
    this._snackBar.open('Item Created', 'Done', {
      duration: 2000,
    });
  }
}
