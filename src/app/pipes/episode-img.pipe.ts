import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'episodeImg'
})
export class EpisodeImgPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return `/assets/images/episodes/${value}.jpg`;
  }

}
