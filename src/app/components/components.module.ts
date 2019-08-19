import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterComponent} from './character/character.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EpisodesComponent} from './episodes/episodes.component';
import {EpisodesModalComponent} from './episodes-modal/episodes-modal.component';
import {LocationComponent} from './location/location.component';
import {EpisodeComponent} from './episode/episode.component';
import {EpisodeImgPipe} from '../pipes/episode-img.pipe';
import {CharactersComponent} from './characters/characters.component';
import {CharactersModalComponent} from './characters-modal/characters-modal.component';
import {GalleryComponent} from './gallery/gallery.component';
import {SlidesComponent} from './slides/slides.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    CharacterComponent,
    EpisodesComponent,
    EpisodesModalComponent,
    LocationComponent,
    EpisodeComponent,
    EpisodeImgPipe,
    CharactersComponent,
    CharactersModalComponent,
    GalleryComponent,
    SlidesComponent,
    NotFoundComponent,
  ],
  exports: [
    CharacterComponent,
    EpisodesComponent,
    LocationComponent,
    EpisodeComponent,
    CharactersComponent,
    CharactersModalComponent,
    GalleryComponent,
    SlidesComponent,
    NotFoundComponent,
  ],
  entryComponents: [
    CharacterComponent,
    EpisodesComponent,
    EpisodesModalComponent,
    LocationComponent,
    EpisodeComponent,
    CharactersComponent,
    CharactersModalComponent,
    GalleryComponent,
    SlidesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})

export class ComponentsModule { }
