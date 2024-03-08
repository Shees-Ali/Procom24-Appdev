import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/pages/base/base';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent extends BasePage implements OnInit {
  UsersList: any[] = [];
  LastUser: any = undefined;
  CreateForm: any = {
    teamName: '',
    batsmanCount: 0,
    bowlerCount: 0,
    wicketBatsmanCount: 0,
    players: [],
    team_owner: ''
  };
  UsersLoading: boolean = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.Init();
    this.getMyTeam();
  }

  async getMyTeam() {
    
  }

  async Init() {
    this.UsersLoading = true;
    this.UsersList = await this.userService.getUsersList(10, this.LastUser);
    const user = await this.userService.getCurrentUser();
    console.log(user);
    this.CreateForm.team_owner = user.user_id;
    this.UsersLoading = false;
  }

  addtoteam(user: any) {
    switch (user?.userSpeciality) {
      case 'Wicket Keeper + Batsman':
        if (this.CreateForm.wicketBatsmanCount > 1) {
          this.utility.showAlert('Cannot Add More Wicket Keeper Batsman');
          return;
        }
        this.CreateForm.wicketBatsmanCount++;
        break;
      case 'Batsman':
        if (this.CreateForm.batsmanCount > 6) {
          this.utility.showAlert('Cannot Add More Batsman');
          return;
        }
        this.CreateForm.batsmanCount++;
        break;
      case 'Bowler':
        if (this.CreateForm.bowlerCount > 1) {
          this.utility.showAlert('Cannot Add More Bowler');
          return;
        }
        this.CreateForm.bowlerCount++;
        break;
      default:
        break;
    }
    this.CreateForm.players.push({
      player_id: user.user_id,
      player_position: user.userSpeciality,
      player_name: user.first_name + ' ' + user.last_name,
    });
  }

  remove(user:any) {

  }

  getIfPlayerInTeam(user: any) {
    const index = this.CreateForm.players.findIndex(
      (x: any) => x.player_id == user.user_id
    );
    if (index != -1) {
      return true;
    }
    return false;
  }

  async saveTeam() {
    this.utility.showLoader("Creating Team");
    await this.teamService.setteamData(this.CreateForm);
    this.utility.hideLoader();
  }
}
