// Afficheur des currencies
import { AfterContentInit, OnInit, Component, ViewChild } from '@angular/core';

import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';

import { Country } from '../models';
import { CurrenciesService } from '../services';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.scss']
})
export class DisplayerComponent implements OnInit, AfterContentInit {

  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 4,
    sm: 2,
    xs: 1
  };

  pageSizeOptions = [5, 10, 20];

  data = [];
  data2: Country[] = [];
  page = 0;
  size = 0;

  constructor(
    private currenciesService: CurrenciesService,
    private observableMedia: ObservableMedia) { }

  ngOnInit() {
    this.size = this.pageSizeOptions[0];
    this.currenciesService.getAllCountry()
      .subscribe(data2 => {
        console.log(data2)
        this.data = data2;
        this.data2 = data2
      });
    // TODO
    // this.getData({pageIndex: this.page, pageSize: this.size});
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable()
      .subscribe((change: MediaChange) => {
        this.grid.cols = this.gridByBreakpoint[change.mqAlias];
      });
  }

  getData(obj) {
    let index = 0;
    let startingIndex = obj.pageIndex * obj.pageSize;
    let endingIndex = startingIndex + obj.pageSize;

    this.data = this.data2
      .filter(() => {
        index++;
        return (
          index > startingIndex &&
          index <= endingIndex
        ) ? true : false;
      });
  }
}
