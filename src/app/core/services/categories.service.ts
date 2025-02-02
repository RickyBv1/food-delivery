import { Injectable } from '@angular/core';
import { Category } from '../interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor() {}

  async getAll(): Promise<Category[]> {
    const res = await fetch('/assets/data/database.json');
    const resJson = await res.json();
    return resJson;
  }

  async getById(id: number): Promise<Category | undefined> {
    const res = await fetch('/assets/data/database.json');
    const resJson: Category[] = await res.json();
    const category = resJson.find((category) => category.id === id);
    if (category) return category;
    return;
  }
}
