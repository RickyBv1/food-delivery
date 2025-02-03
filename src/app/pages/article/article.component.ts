import { Component, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';
import { AmountCounterComponent } from '../../core/components/amount-counter/amount-counter.component';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article',
  imports: [CommonModule, AmountCounterComponent, FormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  standalone: true,
})
export class ArticleComponent {
  headerService = inject(HeaderService);
  productsService = inject(ProductsService);
  cartService = inject(CartService);

  product?: Product;
  amount = signal(1);
  notes = '';

  ngOnInit(): void {
    this.headerService.title.set('Article');
  }

  constructor(private ac: ActivatedRoute, private router: Router) {
    ac.params.subscribe((param) => {
      if (param['id']) {
        this.productsService.getById(param['id']).then((product) => {
          this.product = product;
          this.headerService.title.set(this.product!.name);
        });
      }
    });
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addProduct(this.product?.id, this.amount(), this.notes);
    this.router.navigate(['/cart']);
  }
}
