import { Component } from '@angular/core';
import { NavService } from './services/nav.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public nav: NavService, public menu: MenuController, public auth: AuthService) {}
  goTo(route: string) {
    this.menu.close();
    this.nav.navigateTo(route);
  }

  logOut() {
    this.menu.close();
    this.auth.logOut();
  }
}
