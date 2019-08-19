import {Component, Input, OnInit} from '@angular/core';
import {Episode} from '../../types/episode';
import {LoadingController, ModalController} from '@ionic/angular';
import {RickMortyApiService} from '../../services/rick-morty-api.service';
import {Character} from '../../types/character';
import {EpisodesModalComponent} from '../episodes-modal/episodes-modal.component';
import {CharactersModalComponent} from '../characters-modal/characters-modal.component';
import {GalleryComponent} from '../gallery/gallery.component';

@Component({
  selector: 'component-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit {
  @Input()
  episode: Episode;

  @Input()
  modal: boolean;

  @Input()
  synopsis: string;

  charactersAux: Character[] = [];

  constructor(private modalController: ModalController,
              public loadingController: LoadingController,
              private rickMortyService: RickMortyApiService ) { }

  ngOnInit() {}

  async showCharacters() {
    const loading  = await this.presentLoading();
    await this.loadCharacters();

    const modal = await this.modalController.create({
      component: CharactersModalComponent,
      mode: 'md',
      componentProps: {
        characters: this.charactersAux,
        episode: this.episode.name
      }
    });
    await modal.present();

    loading.dismiss();
  }

  async showImages() {
    const modal = await this.modalController.create({
      component: GalleryComponent,
      mode: 'md',
      componentProps: {
        episode: this.episode
      }
    });
    await modal.present();
  }

  async loadCharacters() {
    const characters = this.episode.characters.map( (c: string) => {
      return c.split('/')[c.split('/').length - 1];
    }).reduce( (a: string, b: string) => `${a},${b}`);

    if (this.charactersAux.length === 0) {
      this.charactersAux = await this.rickMortyService.getCharactersList(characters);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      cssClass: 'loading',
      mode: 'md'
    });
    await loading.present();

    return loading;
  }

}
