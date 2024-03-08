import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base/base';
import { CreateTeamComponent } from 'src/app/components/create-team/create-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage extends BasePage implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  async CreateMyTeam() {
    const res = await this.modals.present(CreateTeamComponent);
    console.log(res);
  }
}
