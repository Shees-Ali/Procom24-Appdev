import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base/base';
import { CreateLeagueComponent } from 'src/app/components/create-league/create-league.component';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage extends BasePage implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  async CreateMyTeam() {
    const res = await this.modals.present(CreateLeagueComponent);
    console.log(res);
  }
}
