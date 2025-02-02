import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products';
import { Category } from '../interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  async getByCategory(id: number): Promise<Product[]> {
    const res = await fetch('/assets/data/database.json');
    const resJson: Category[] = await res.json();
    const products = resJson.find((category) => category.id === id)?.products;
    if (products) return products;
    return [];
  }
}
