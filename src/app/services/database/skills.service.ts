import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  skillsUpdated = new Subject<void>();
  constructor(private firebase: FirebaseService) {}

  setSkillsData(user_id: string, skills: any) {
    return this.firebase.setData('users/' + user_id + '/skills/', skills);
  }

  getSkillsData(user_id: string | undefined) {
    return this.firebase.getDataOnValue('users/' + user_id + '/skills');
  }
}
