import { TestBed } from '@angular/core/testing';

import { RickMortyApiService } from './rick-morty-api.service';

describe('RickMortyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RickMortyApiService = TestBed.get(RickMortyApiService);
    expect(service).toBeTruthy();
  });
});
