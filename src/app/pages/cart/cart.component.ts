import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AmountCounterComponent } from '../../core/components/amount-counter/amount-counter.component';
import { Product } from '../../core/interfaces/products';
import { ProductsService } from '../../core/services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, AmountCounterComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
})
export class CartComponent {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  cartProducts: Product[] = [];

  subtotal = 0;
  delivery = 10;
  total = 0;

  ngOnInit(): void {
    this.headerService.title.set('Cart');
    this.cartService.cart.forEach(async (cartItem) => {
      const res = await this.productsService.getById(cartItem.idProduct);
      if (res) this.cartProducts.push(res);
      this.calculateInfo();
    });
  }

  deleteProduct(idProduct: number) {
    this.cartService.deleteProduct(idProduct);
  }

  calculateInfo() {
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.cart.length; i++) {
      this.subtotal +=
        this.cartProducts[i].price * this.cartService.cart[i].amount;
    }
    this.total = this.subtotal + this.delivery;
  }

  changeProductAmount(id: number, amount: number) {
    this.cartService.changeProductAmount(id, amount);
    this.calculateInfo();
  }
}
