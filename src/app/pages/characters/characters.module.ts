import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharactersPage} from './characters.page';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [CharactersPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CharactersPage
      }
    ]),
    ComponentsModule
  ],
})
export class CharactersPageModule { }
