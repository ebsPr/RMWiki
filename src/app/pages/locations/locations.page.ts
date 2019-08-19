import { Component, OnInit } from '@angular/core';
import {RickMortyApiService} from '../../services/rick-morty-api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  locations: any[] = [];

  previous: string;
  next: string;
  max: number;

  searchString = '';
  notFound = false;
  init = true;

  constructor(private rickMortyService: RickMortyApiService) { }

  async ngOnInit() {
    this.loadData();
  }

  async  loadData() {
    const result = await this.rickMortyService
        .getLocations(
            this.searchString,
            this.next === '' ? undefined : this.next
        );

    if (result.error) {
      this.notFound = true;
    } else {
      this.notFound = false;
      this.locations.push(...result.list);

      this.previous = result.previous;
      this.next = result.next;
      this.max = result.max;

      this.init = false;

      const descriptions = await this.rickMortyService.getLocationDescriptions();

      result.list.forEach( async location => {
        location.description = descriptions[location.id];
        const [image, err] = await this.rickMortyService.getLocationImage(location.id);
        if (image) {
          location.image = image;
        }
      });
    }
  }

  async loadFromInfiniteScroll(event) {
    this.loadData();

    if (event) {
      if (this.locations.length === this.max || this.next === '') {
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
    this.locations = [];
    this.max = 0;
    this.previous = '';
    this.next = '';
  }

}
