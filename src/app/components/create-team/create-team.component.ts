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
  CreateForm?: any = {
    teamName: '',
    batsmanCount: 0,
    bowlerCount: 0,
    wicketBatsmanCount: 0
  }; 
  UsersLoading: boolean = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  async getUsers() {
    this.UsersLoading = true;
    this.UsersList = await this.userService.getUsersList(10, this.LastUser);
    this.UsersLoading = false;
    console.log(this.UsersList);
  }

  addtoteam() {

  }
}
