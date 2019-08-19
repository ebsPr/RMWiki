import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'component-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  @Input() location: any;

  constructor() { }

  ngOnInit() {}

}
