import { Component, effect, inject, signal } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerService = inject(HeaderService);
  appliedClass = signal('');
  shownTitle = signal('');

  hideTitle = effect(
    () => {
      if (this.headerService.title()) {
        this.appliedClass.set('fade-out');
      }
    },
    { allowSignalWrites: true }
  );

  showNewTitle(e: AnimationEvent) {
    if (e.animationName.includes('fade-out')) {
      this.shownTitle.set(this.headerService.title());
      this.appliedClass.set('fade-in');
      setTimeout(() => this.appliedClass.set(''), 250);
    }
  }
}
