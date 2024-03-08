import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaguesPageRoutingModule } from './leagues-routing.module';

import { LeaguesPage } from './leagues.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    LeaguesPageRoutingModule
  ],
  declarations: [LeaguesPage]
})
export class LeaguesPageModule {}
