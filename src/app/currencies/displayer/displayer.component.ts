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

  isLoading: boolean;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  pageSizeOptions = [12, 24, 36];
  currencyDB: Country[] = [];
  currencyList = [];
  page = 0;
  size = 0;

  constructor(
    private currenciesService: CurrenciesService,
    private observableMedia: ObservableMedia) { }

  ngOnInit() {
    this.isLoading = true;
    this.size = this.pageSizeOptions[0];
    this.currenciesService.getAllCountry()
      .subscribe(resp => {
        this.currencyDB = resp;

        this.getPaginatedData({
          pageIndex: this.page,
          pageSize: this.size
        });
      });
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable()
      .subscribe((change: MediaChange) => {
        this.grid.cols = this.gridByBreakpoint[change.mqAlias];
      });
  }

  getPaginatedData(obj) {
    this.isLoading = true;

    let index = 0;
    let startingIndex = obj.pageIndex * obj.pageSize;
    let endingIndex = startingIndex + obj.pageSize;
    debugger
    this.currencyList = this.currencyDB
      .filter(() => {
        index++;
        return (
          index > startingIndex &&
          index <= endingIndex
        ) ? true : false;
      });

    this.isLoading = false;
  }
}
