import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private config:ConfigService) {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const savedCart = JSON.parse(cart);
      if (savedCart) {
        const savedDate = new Date(savedCart.date);
        const date = new Date();
        if (date.getTime() - savedDate.getTime() > 1000*60*60*24*this.config.configuration().cartExpirationDays) {
          this.empty
        } else {
          this.cart = savedCart.products;
        }
      }
    }
  }

  cart: Cart[] = [];

  addProduct(idProduct: number, amount: number, notes: string) {
    const i = this.cart.findIndex((product) => product.idProduct === idProduct);
    if (i === -1) {
      const newProduct: Cart = {
        idProduct: idProduct,
        amount: amount,
        notes: notes,
      };
      this.cart.push(newProduct);
    } else {
      this.cart[i].amount += amount;
    }
    this.updateStorage();
  }

  deleteProduct(idProduct: number) {
    this.cart = this.cart.filter((product) => product.idProduct !== idProduct);
    if (this.cart.length === 0) return localStorage.removeItem("cart");
    this.updateStorage();
  }

  changeProductAmount(idProduct: number, amount: number) {
    this.cart = this.cart.map((product) => {
      const currentProduct = product;
      if (currentProduct.idProduct === idProduct)
        currentProduct.amount = amount;
      return currentProduct;
    });
    this.updateStorage();
  }

  updateStorage() {
    const date = new Date();
    const toSaveElement = {
      date,
      products: this.cart
    }
    localStorage.setItem('cart', JSON.stringify(toSaveElement));
  }

  empty() {
    this.cart = [];
    localStorage.removeItem("cart");
  }
}
