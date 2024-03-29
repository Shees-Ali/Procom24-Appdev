import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/pages/base/base';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BasePage implements OnInit {
  @Input('title') title: string = '';
  @Input('showMenu') showMenu: boolean = false;
  @Input('showBack') showBack: boolean = false;
  @Input('isModal') isModal: boolean = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  back() {
    if (this.isModal) {
      this.modals.dismiss();
      return;
    }
    this.nav.pop();
  }
}
