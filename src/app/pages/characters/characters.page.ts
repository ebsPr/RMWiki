import { Component, OnInit } from '@angular/core';
import {RickMortyApiService} from '../../services/rick-morty-api.service';
import {Character} from '../../types/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  characters: Character[] = [];
  previous: string;
  next: string;
  max: number;
  searchString = '';

  init = true;

  notFound = false;

  constructor( private rickMortyService: RickMortyApiService) { }

  async  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const result = await this.rickMortyService
        .getCharacters(
            this.searchString,
            event ? this.next : undefined
        );

    if (result.error) {
      this.notFound = true;
    } else {
      this.notFound = false;
      this.characters.push(...result.list);

      this.previous = result.previous;
      this.next = result.next;
      this.max = result.max;

      this.init = false;
    }

  }

  async loadFromInfiniteScroll( event ) {
    await this.loadData();

    if (event) {
      if (this.characters.length === this.max || this.next === '') {
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

  resetData() {
    console.log('reset');
    this.characters = [];
    this.max = 0;
    this.previous = undefined;
    this.next = undefined;
  }

}
