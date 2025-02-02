import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/categories';

@Component({
  selector: 'app-category-cards',
  imports: [CommonModule],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.scss',
  standalone: true,
})
export class CategoryCardsComponent {
  @Input({ required: true }) category!: Category;
}
