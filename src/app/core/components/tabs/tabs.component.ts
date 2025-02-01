import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case "/":
            this.selected = [true, false, false, false];
            break;
          case "/search":
            this.selected = [false, true, false, false];
            break;
          case "/cart":
            this.selected = [false, false, true, false];
            break;
          case "/profile":
            this.selected = [false, false, false, true];
            break;
          default:
            this.selected = [false, false, false, false];
            break;
        }
      }
    })
  }

  selected = [false, false, false, false];
  deactivatedColor = "#555555";
  activatedColor = "#000000"

  navigate(direction: string) {
    //Go to a different tab

    this.router.navigate([direction]);
  }
}
