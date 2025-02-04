import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
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
  categoriesService = inject(CategoriesService);
  ac = inject(ActivatedRoute);
  products: WritableSignal<Product[]> = signal([]);

  ngOnInit(): void {
    this.ac.params.subscribe((params) => {
      if (params['id']) {
        this.categoriesService
          .getById(parseInt(params['id']))
          .then((category) => {
            if (category) {
              this.products.set(category.products);
              this.headerService.title.set(category.name);
            }
          });
      }
    });
  }
}
