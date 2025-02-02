import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-amount-counter',
  imports: [CommonModule, RouterModule],
  templateUrl: './amount-counter.component.html',
  styleUrl: './amount-counter.component.scss',
  standalone: true,
})
export class AmountCounterComponent {
  number = signal(1);
  @Output() changedAmount = new EventEmitter<number>();

  updateNumber(difference: number) {
    this.number.set(Math.max(this.number() + difference, 1));
    this.changedAmount.emit(this.number());
  }
}
