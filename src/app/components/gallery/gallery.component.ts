import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SlidesComponent} from '../slides/slides.component';
import {RickMortyApiService} from '../../services/rick-morty-api.service';
import {Episode} from '../../types/episode';

@Component({
  selector: 'component-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  @Input() episode: Episode;

  gallerySrc: any[] = [];
  gallerySrcLoading: any[] = [];
  nextPageToken: string;

  constructor(private modalController: ModalController, private rickmortyService: RickMortyApiService) { }

  async ngOnInit() {
    this.loadData();

  }


    getInstance(img) {
      return img instanceof Promise;
    }


  async loadData(event?) {

    // get 25 images of gallery
    const result = await this.rickmortyService.getGalleryEpisode(this.episode.episode, this.nextPageToken);
    // save the next token to get the next 25 images
    this.nextPageToken = result.nextPageToken;

    // save the actual list of images
    const listAux =  [...this.gallerySrc];

    // we add the next empty items to show the spinner loading
    this.gallerySrc.push(...new Array(result.items.length));
    this.gallerySrcLoading.push(...new Array(result.items.length));


    const aux = result.items.map( async (data, index) => {
      const url =  await data.getDownloadURL();
      this.gallerySrcLoading[index + listAux.length] = true;
      return url;
    });

    // restore the complete list images
    this.gallerySrc = [...listAux, ...aux]

    if (event) {
      if (!this.nextPageToken) {
        event.target.disabled = true;
      }
      if (event) {
        event.target.complete();
      }
    }
  }

  close() {
    this.modalController.dismiss();
  }

  async openSlides() {
    const modal = await this.modalController.create({
      component: SlidesComponent,
      mode: 'md',
      componentProps: {
        gallery: this.gallerySrc
      }
    });
    await modal.present();
  }
}
