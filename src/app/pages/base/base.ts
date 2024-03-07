import { NavService } from './../../services/nav.service';
import { Injector } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Location } from '@angular/common';
import { MenuController, Platform } from '@ionic/angular';
import { ModalService } from 'src/app/services/basic/modal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/basic/storage.service';
import { FormBuilder } from '@angular/forms';
import { FormErrorsService } from 'src/app/services/basic/form-errors.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/database/user.service';
import { SkillService } from 'src/app/services/database/skills.service';

export abstract class BasePage {
  public formErrors: FormErrorsService;
  public formBuilder: FormBuilder;
  public utility: UtilityService;
  public nav: NavService;
  public location: Location;
  public modals: ModalService;
  public menuCtrl: MenuController;
  public domSanitizer: DomSanitizer;
  public storageService: StorageService;
  public platform: Platform;
  public authService: AuthService;
  public userService: UserService;
  public skillService: SkillService;

  constructor(injector: Injector) {
    this.formErrors = injector.get(FormErrorsService);
    this.formBuilder = injector.get(FormBuilder);
    this.platform = injector.get(Platform);
    this.utility = injector.get(UtilityService);
    this.location = injector.get(Location);
    this.nav = injector.get(NavService);
    this.modals = injector.get(ModalService);
    this.menuCtrl = injector.get(MenuController);
    this.storageService = injector.get(StorageService);
    this.domSanitizer = injector.get(DomSanitizer);
    this.authService = injector.get(AuthService);
    this.userService = injector.get(UserService);
    this.skillService = injector.get(SkillService);
  }
}
