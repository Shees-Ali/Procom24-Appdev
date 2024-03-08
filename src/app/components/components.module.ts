import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CreateTeamComponent } from './create-team/create-team.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, CreateTeamComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ComponentsModule {}
