// Afficheur d'un currency et qui compose le displayer
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-one-currency',
  templateUrl: './one-currency.component.html',
  styleUrls: ['./one-currency.component.scss']
})
export class OneCurrencyComponent implements OnInit {

  @Input() dd: any;

  constructor() { }

  ngOnInit() {
  }

}
