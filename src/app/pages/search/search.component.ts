import { Component, inject, NgModule, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

import { FormsModule } from '@angular/forms';
import { Search } from '../../core/interfaces/search';
import { ProductsService } from '../../core/services/products.service';
import { ProductCardComponent } from '../../core/components/product-card/product-card.component';
import { Product } from '../../core/interfaces/products';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule, ProductCardComponent, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
})
export class SearchComponent {
  headerService = inject(HeaderService);
  productsService = inject(ProductsService);
  products: WritableSignal<Product[]> = signal([]);
  loading = signal(true)

  ngOnInit(): void {
    this.headerService.title.set('Search');
    this.productsService.getAll().then(res => {
      this.products.set(res)
      this.loading.set(false)
    });
  }
  
  searchParameters: Search = {
    text: '',
    isGlutenFree: false,
    isVegan: false,
  };
  
  async search() {
    this.loading.set(true)
    this.products.set(await this.productsService.search(this.searchParameters));
    this.loading.set(false)
  }
}
