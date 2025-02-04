import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products';
import { Category } from '../interfaces/categories';
import { Search } from '../interfaces/search';

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

  async getAll(): Promise<Product[]> {
    const res = await fetch('/assets/data/database.json');
    const resJson: Category[] = await res.json();
    let products: Product[] = [];
    resJson.forEach((category) => {
      products = [...products, ...category.products];
    });
    return products;
  }

  async getById(id: number): Promise<Product | undefined> {
    const products = await this.getAll();
    const selectedProduct = products.find((product) => product.id === id);
    return selectedProduct ? selectedProduct : undefined;
  }

  async search(parameters: Search) {
    const products = await this.getAll();
    const filteredProducts = products.filter((product) => {
      if (parameters.isGlutenFree && !product.isCeliac) return false;
      if (parameters.isVegan && !product.isVegan) return false;
      const titleSearch = product.name
        .toLowerCase()
        .includes(parameters.text.toLowerCase());
      if (titleSearch) return true;
      for (let i = 0; i < product.ingredients.length; i++) {
        const ingredient = product.ingredients[i];
        if (ingredient.toLowerCase().includes(parameters.text.toLowerCase()))
          return true;
      }
      return false;
    });
    return filteredProducts;
  }
}
