import { Component, OnInit } from '@angular/core';
import {Episode} from '../../types/episode';
import {RickMortyApiService} from '../../services/rick-morty-api.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
})
export class EpisodesPage implements OnInit {

  episodes: Episode[] = [];
  previous: string;
  next: string;
  max: number;

  searchSeason = '';
  searchName = '';

  synopsis: any = {};

  init = true;

  notFound = false;

  constructor(private rickMortyService: RickMortyApiService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const result = await this.rickMortyService
        .getEpisodes(
            this.searchSeason,
            this.searchName,
            this.next !== '' ? this.next : undefined,
        );

    if (result.error) {
      this.notFound = true;
    } else {
      this.notFound = false;
      this.episodes.push(...result.list);

      this.loadScreenshots();
      this.loadSynopsis();

      this.previous = result.previous;
      this.next = result.next;
      this.max = result.max;

      this.init = false;
    }


  }

  async loadFromInfiniteScroll(event) {
    await this.loadData();

    if (event) {
      if (this.episodes.length === this.max || this.next === '') {
        event.target.disabled = true;
      }
      if (event) {
        event.target.complete();
      }
    }
  }

  loadFromSearch() {
    this.resetData();
    this.loadData();
  }

  private async loadSynopsis() {
    this.synopsis = await this.rickMortyService.getSynopsis();
  }

  private async loadScreenshots() {
    this.episodes.forEach( async (data) => {
      const img = await this.rickMortyService.getImageEpisode(data.episode);
      data.screenshot = img;
    });
  }

  resetData() {
    this.episodes = [];
    this.max = 0;
    this.previous = '';
    this.next = '';
  }

}
