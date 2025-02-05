
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-amount-counter',
  imports: [RouterModule],
  templateUrl: './amount-counter.component.html',
  styleUrl: './amount-counter.component.scss',
  standalone: true,
})
export class AmountCounterComponent implements OnInit {
  ngOnInit(): void {
    this.number.set(this.initialAmount);
  }
  number = signal(1);
  @Output() changedAmount = new EventEmitter<number>();
  @Input() initialAmount = 1;

  updateNumber(difference: number) {
    this.number.set(Math.max(this.number() + difference, 1));
    this.changedAmount.emit(this.number());
  }
}
