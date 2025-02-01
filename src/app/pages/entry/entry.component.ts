import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-entry',
  imports: [CommonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.title.set('Entry');
  }
}
