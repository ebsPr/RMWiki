import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseApp, FirebaseStorage} from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {

  API = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient,
              private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private firebaseApp: FirebaseApp) {
  }

    async _getData(url: string) {
      return this.http
          .get(url)
          .pipe(
              map( (data: any) => {
                  console.log('data', data)
                  if (data.info) {
                      return {
                          next: data.info.next,
                          previous: data.info.prev,
                          list: data.results,
                          max: data.info.count
                      };
                  } else {
                      return data;
                  }

              })
          )
          .toPromise()
          .then( data => data)
          .catch( error => {
              console.log('error');
              return { error: true};
          });
    }
    async getCharacters(search: string, url: string = `${this.API}/character?page=1`) {
        if  (search && !url.includes('name')) {
            url += `&name=${search}`;
        }
        return this._getData(url);
    }

    async getCharactersList(list: string, url: string = `${this.API}/character`) {
        url += `/${list}`;
        return this._getData(url);
    }

    async _getEpisodes(url: string) {
        return this.http
            .get(url)
            .pipe(
                map( (data: any) => {
                    if (data.info) {
                        return {
                            next: data.info.next,
                            previous: data.info.prev,
                            list: data.results,
                            max: data.info.count
                        };
                    } else {
                        return data.length ? data : [data];
                    }

                })
            )
            .toPromise()
            .then( data => data)
            .catch( error => {
                console.log('error');
                return { error: true};
            });
    }

    async getEpisodes(searchSeason: string, searchName: string, url: string = `${this.API}/episode?page=1`) {
        if  (searchSeason !== '' && !url.includes('episode=')) {
            url += `&episode=S0${searchSeason}`;
        }
        if  (searchName !== '' && !url.includes('name=')) {
            url += `&name=${searchName}`;
        }
        return this._getEpisodes(url);
    }

    async getEpisodesList(list: string, url: string = `${this.API}/episode`) {
      url += `/${list}`;
      return this._getEpisodes(url);
    }


    async getImageEpisode(episode: string) {
      return this.storage.ref(`episodes/${episode}.jpg`).getDownloadURL().toPromise();
    }

    async getGalleryEpisode(episode: string, nextPageToken?: string) {
        const listProperties: any = { maxResults: 10};
        if (nextPageToken) {
            // @ts-ignore
            listProperties.pageToken = nextPageToken;
        }
        return await this.firebaseApp.storage()
            .ref('screenshots')
            .child(episode)
            .list(listProperties);
    }

    async getSynopsis() {
      return this.afs
          .collection('RMWiki')
          .doc('urpwxFxyJ0ULOD7OtP7p')
          .collection('synopsis')
          .doc('QV841nSZHflOsIuIwA3K')
          .get()
          .pipe(
              map( (data1: any) => {
                  if (data1.exists) {
                      return data1.data();
                  }
              })
          )
          .toPromise();
    }

    async getLocations(search: string, url: string = `${this.API}/location?page=1`) {
        if  (search !== '' && !url.includes('name')) {
            url += `&name=${search}`;
        }
        return this._getData(url);
    }

    async getLocationImage(location) {
        return this.storage
            .ref(`locations/${location}.jpg`)
            .getDownloadURL()
            .toPromise()
            .then( data => {
                return [data, null];
            })
            .catch( error => {
                return [null, error];
            });
    }

    async getLocationDescriptions() {
        return this.afs
            .collection('RMWiki')
            .doc('urpwxFxyJ0ULOD7OtP7p')
            .collection('locations')
            .doc('XqJbgCqJRNNeKkJgl9W4')
            .get()
            .pipe(
                map( (data1: any) => {
                    if (data1.exists) {
                        return data1.data();
                    }
                })
            )
            .toPromise();
    }
}
