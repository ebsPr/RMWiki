import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'component-episodes-modal',
  templateUrl: './episodes-modal.component.html',
  styleUrls: ['./episodes-modal.component.scss'],
})
export class EpisodesModalComponent implements OnInit {

  @Input() character: string;
  @Input() episodes: any[];
  @Input() synopsis: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

}
