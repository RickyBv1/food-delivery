import { Component, inject, NgModule } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../../core/interfaces/search';
import { ProductsService } from '../../core/services/products.service';
import { ProductCardComponent } from '../../core/components/product-card/product-card.component';
import { Product } from '../../core/interfaces/products';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
})
export class SearchComponent {
  headerService = inject(HeaderService);
  productsService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit(): void {
    this.headerService.title.set('Search');
    this.productsService.getAll().then((res) => (this.products = res));
  }

  searchParameters: Search = {
    text: '',
    isGlutenFree: false,
    isVegan: false,
  };

  async search() {
    this.products = await this.productsService.search(this.searchParameters);
  }
}
