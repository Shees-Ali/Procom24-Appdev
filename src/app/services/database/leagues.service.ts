import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private firebase: FirebaseService) {}

  setleagueData(user_id: string, league: any) {
    return this.firebase.setData('leagues/' + user_id, league);
  }

  updateleague(league_id: string | undefined, update: any) {
    return this.firebase.updateData('leagues/' + league_id, update);
  }

  getleagueData(league_id: string | undefined) {
    return this.firebase.getDataOnValue('leagues/' + league_id);
  }

  getleaguesList(limit: number, last_item = undefined, filter: string = '') {
    return this.firebase.listData('leagues', limit, last_item, filter);
  }

  countleagues() {
    return this.firebase.countData('leagues');
  }
}
