
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  standalone: true
})
export class TabsComponent {
  constructor(public router: Router) {}

  deactivatedColor = '#555555';
  activatedColor = '#000000';
}
