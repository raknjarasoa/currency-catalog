import { Component } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  selectedRegion: string;
  searchTerm: string;
  regionList = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
}
