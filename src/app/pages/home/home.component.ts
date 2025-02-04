import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/categories';
import { CategoryCardsComponent } from '../../core/components/category-cards/category-cards.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CategoryCardsComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  headerService = inject(HeaderService);
  categoriesService = inject(CategoriesService);
  categories: WritableSignal<Category[]> = signal([]);

  ngOnInit(): void {
    this.headerService.title.set('Home');
    this.headerService.extended.set(true);
    this.categoriesService.getAll().then((res) => (this.categories.set(res)));
  }

  ngOnDestroy(): void {
    this.headerService.extended.set(false);
  }
}
