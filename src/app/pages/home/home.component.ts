import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.title.set('Home');
    this.headerService.extended.set(true);
  }

  ngOnDestroy(): void {
    this.headerService.extended.set(false);
  }
}
