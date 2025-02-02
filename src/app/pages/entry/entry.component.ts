import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../core/interfaces/products';
import { ProductCardComponent } from '../../core/components/product-card/product-card.component';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-entry',
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
  standalone: true,
})
export class EntryComponent {
  headerService = inject(HeaderService);
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);
  ac = inject(ActivatedRoute);
  products: Product[] = [];

  ngOnInit(): void {
    this.ac.params.subscribe((params) => {
      if (params['id']) {
        this.categoriesService
          .getById(parseInt(params['id']))
          .then((category) => {
            if (category) {
              this.products = category.products;
              this.headerService.title.set(category.name);
            }
          });
      }
    });
  }
}
