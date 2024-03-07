import { Component } from '@angular/core';
import { NavService } from './services/nav.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public nav: NavService) {}
  goTo(route: string) {
    console.log(route);
    this.nav.navigateTo(route);
  }
}
