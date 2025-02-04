import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AmountCounterComponent } from '../../core/components/amount-counter/amount-counter.component';
import { Product } from '../../core/interfaces/products';
import { ProductsService } from '../../core/services/products.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { STORE_PHONE } from '../../core/constants/phone';

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
  profileService = inject(ProfileService);
  router = inject(Router)

  cartProducts: Product[] = [];

  subtotal = 0;
  delivery = 10;
  total = 0;
  @ViewChild("dialog") dialog!:ElementRef<HTMLDialogElement>;

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

  async sendMessage() {
    let order = '';
    for (let i = 0; i < this.cartService.cart.length; i++) {
      const product = await this.productsService.getById(
        this.cartService.cart[i].idProduct
      );
      order += `* ${this.cartService.cart[i].amount} X ${product?.name}
`;
    }
    const message = `
Hello, this is ${this.profileService.profile()?.name}, and would like:
${order}
If you need to contact me, please text this number ${this.profileService.profile()?.phone}
The delivery address is ${this.profileService.profile()?.address} - ${this.profileService.profile()?.deliveryDetails}
Thanks.
`;
    const link = `https://wa.me/${STORE_PHONE}?text=${encodeURI(message)}`;
    window.open(link, '_blank');
    this.dialog.nativeElement.showModal();
  }

  endOrder(){
    this.cartService.empty();
    this.dialog.nativeElement.close();
    this.router.navigate(['/'])
  }

  editOrder(){
    this.dialog.nativeElement.close();
  }
}
