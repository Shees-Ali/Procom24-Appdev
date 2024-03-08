import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base/base';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss'],
})
export class CreateLeagueComponent extends BasePage implements OnInit {
  League = {
    leagueName: '',
    matches: [
      {
        matchName: '',
        score: '',
        date: '',
      },
    ],
    teams: [
      {
        teamName: '',
        teamId: '',
      },
    ],
  };
  Teams: any[] = [];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.Init();
    this.getMyTeam();
  }

  async getMyTeam() {
    this.Teams = await this.teamService.getteamsList(100);
  }

  async Init() {}

  addMatch() {
    this.League.matches.push({
      matchName: '',
      score: '',
      date: '',
    });
  }

  SaveLeague() {

  }
}
