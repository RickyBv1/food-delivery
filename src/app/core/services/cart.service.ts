import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) this.cart = JSON.parse(cart);
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
    if (this.cart.length === 0) return localStorage.clear();
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
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
