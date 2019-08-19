import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../types/character';
import {LoadingController, ModalController} from '@ionic/angular';
import {EpisodesModalComponent} from '../episodes-modal/episodes-modal.component';
import {RickMortyApiService} from '../../services/rick-morty-api.service';
import {Episode} from '../../types/episode';

@Component({
  selector: 'component-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  @Input() character: Character;
  @Input() modal = false;

  episodesAux: Episode[] = [];
  synopsis: any;

  constructor(private modalController: ModalController,
              public loadingController: LoadingController,
              private rickMortyService: RickMortyApiService ) { }

  ngOnInit() {
  }

  async showEpisodes() {

    await this.loadEpisodes();
    await this.loadSynopsis();

    const modal = await this.modalController.create({
      component: EpisodesModalComponent,
      mode: 'md',
      componentProps: {
        episodes: this.episodesAux,
        synopsis: this.synopsis,
        character: this.character.name
      }
    });
    await modal.present();
  }

  async loadEpisodes() {

    const loading = await this.presentLoading();

    const episodes = this.character.episode.map( (e: string) => {
      return e.split('/')[e.split('/').length - 1];
    }).reduce( (a: string, b: string) => `${a},${b}`);


    if (this.episodesAux.length === 0) {
      // @ts-ignore
      this.episodesAux = await this.rickMortyService.getEpisodesList(episodes);

      await this.loadScreenshots();
    }
    loading.dismiss();
  }

  async loadScreenshots() {
    this.episodesAux.forEach( async (data) => {
      const img = await this.rickMortyService.getImageEpisode(data.episode);
      data.screenshot = img;
    });
  }

  async loadSynopsis() {
    this.synopsis = await this.rickMortyService.getSynopsis();
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
