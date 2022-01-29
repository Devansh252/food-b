import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ServicesService } from '../services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  admin: boolean = false;
  dishes: any;
  displayStyle = 'none';
  id: number;
  dName: string;
  dUrl: string;
  dDescription: string;
  dPrice: number;

  constructor(
    public authService: AuthService,
    private menuData: ServicesService,
    private _snackBar: MatSnackBar,
    private cartService: CartService
  ) {}
  breakpoint: number;

  ngOnInit() {
    this.menuData.getItems().subscribe((data: any) => {
      this.dishes = data;
    });

    if (this.authService.getUser() == '0') this.admin = true;

    console.log(typeof this.admin);
    this.breakpoint = window.innerWidth <= 400 ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  deleteItem(i: number) {
    this.menuData.deleteItems(i).subscribe((data: any) => {
      console.log(data);
    });
  }

  openPopup(item: any) {
    this.id = item.id;
    this.displayStyle = 'block';
    console.log(item);
    this.dPrice = item.price;
    this.dName = item.name;
    this.dUrl = item.image;
    this.dDescription = item.description;
  }
  closePopup() {
    this.displayStyle = 'none';
    window.location.reload();
  }

  onEdit(form: NgForm) {
    this.menuData.editItems(form.value, this.id).subscribe((res) => {
      this.closePopup();
    });
  }

  openSnackBar() {
    this._snackBar.open('Item Created', 'Done', {
      duration: 2000,
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
}
