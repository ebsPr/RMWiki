import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../types/character';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'component-characters-modal',
  templateUrl: './characters-modal.component.html',
  styleUrls: ['./characters-modal.component.scss'],
})
export class CharactersModalComponent implements OnInit {

  @Input() characters: Character[];
  @Input() episode: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

}
