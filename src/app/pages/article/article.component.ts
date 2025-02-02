import { Component, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';
import { AmountCounterComponent } from '../../core/components/amount-counter/amount-counter.component';

@Component({
  selector: 'app-article',
  imports: [CommonModule, AmountCounterComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  standalone: true,
})
export class ArticleComponent {
  headerService = inject(HeaderService);
  productsService = inject(ProductsService);

  product?: Product;
  amount = signal(1);

  ngOnInit(): void {
    this.headerService.title.set('Article');
  }

  constructor(private ac: ActivatedRoute) {
    ac.params.subscribe((param) => {
      if (param['id']) {
        this.productsService.getById(param['id']).then((product) => {
          this.product = product;
          this.headerService.title.set(this.product!.name);
        });
      }
    });
  }
}
