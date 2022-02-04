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
  images = [944, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  admin: boolean = false;
  starters: any;
  snacks: any;
  mains: any;
  chineses: any;
  desserts: any;
  displayStyle = 'none';
  displayDelete = 'none';
  id: number;
  dName: string;
  dUrl: string;
  dDescription: string;
  dPrice: number;
  dId: number;

  constructor(
    public authService: AuthService,
    private menuData: ServicesService,
    private _snackBar: MatSnackBar,
    private cartService: CartService
  ) {}
  breakpoint: number;

  ngOnInit() {
    this.menuData.getItems().subscribe((data: any) => {
      this.starters = data.filter(function (i: any) {
        return i.category == 'starter';
      });
      this.snacks = data.filter(function (i: any) {
        return i.category == 'snack';
      });
      this.mains = data.filter(function (i: any) {
        return i.category == 'main';
      });
      this.chineses = data.filter(function (i: any) {
        return i.category == 'chinese';
      });
      this.desserts = data.filter(function (i: any) {
        return i.category == 'dessert';
      });
    });

    if (this.authService.getUser() == '0') this.admin = true;

    console.log(typeof this.admin);
    this.breakpoint = window.innerWidth <= 400 ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  deleteItem() {
    this.menuData.deleteItems(this.dId).subscribe((data: any) => {
      window.location.reload();
    });
  }

  openPopupDelete(j: number) {
    this.displayDelete = 'block';
    this.dId = j;
  }
  closePopupDelete() {
    this.displayDelete = 'none';
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
