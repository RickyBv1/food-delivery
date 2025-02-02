import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: true,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
