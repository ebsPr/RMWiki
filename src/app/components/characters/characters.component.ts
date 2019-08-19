import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from '../../types/character';

@Component({
  selector: 'component-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {

  @Input() characters: Character[];
  @Input() modal = false;
  @Input() max: number;

  @Output('loadData')
  loadDataEvent: EventEmitter<any>;


  constructor() {
    this.loadDataEvent = new EventEmitter();
  }

  ngOnInit() {}

  loadData(event) {
    console.log('loadData characterscomponent');
    this.loadDataEvent.emit(event);
  }
}
