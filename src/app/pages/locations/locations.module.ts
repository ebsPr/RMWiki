import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationsPage } from './locations.page';
import {ComponentsModule} from '../../components/components.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';

const routes: Routes = [
  {
    path: '',
    component: LocationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AngularFirestoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
