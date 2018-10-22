import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedRegion: string;
  searchTerm: string;
  regionList = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

}
