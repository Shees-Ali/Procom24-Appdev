import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private firebase: FirebaseService,
  ) {}

  setteamData(team: any) {
    return this.firebase.pushData('teams/', team);
  }

  updateteam(team_id: string | undefined, update: any) {
    return this.firebase.updateData('teams/' + team_id, update);
  }

  getteamData(team_id: string | undefined) {
    return this.firebase.getDataOnValue('teams/' + team_id);
  }

  getteamsList(limit: number, last_item = undefined, filter: string = '') {
    return this.firebase.listData('teams', limit, last_item, filter);
  }

  countteams() {
    return this.firebase.countData('teams');
  }
}
