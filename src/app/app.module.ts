import { TodoModalComponent } from './pages/todo-modal/todo-modal.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';

const firebaseConfig = {

};

@NgModule({
    declarations: [AppComponent, TodoModalComponent],
    entryComponents: [TodoModalComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule,
        AngularFirestoreModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFirestore,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
