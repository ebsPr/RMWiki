import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Episode} from '../../types/episode';

@Component({
  selector: 'component-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {

  @Input() episodes: Episode[];
  @Input() synopsis: any;
  @Input() modal = false;

  @Output('loadData')
  loadDataEvent: EventEmitter<any>;

  constructor() {
    this.loadDataEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  loadData(event) {
    this.loadDataEvent.emit(event);
  }


}
