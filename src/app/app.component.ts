import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TabsComponent } from "./core/components/tabs/tabs.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'food-delivery';
}
