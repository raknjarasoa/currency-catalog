// Afficheur des currencies
import { AfterContentInit, OnInit, Component, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatPaginator } from "@angular/material";

import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';

import { Country } from '../models';
import { CurrenciesService } from '../services';

export interface PaginatedParams {
  selectedRegion?: string;
  searchTerm?: string;
  pageIndex?: number;
  pageSize?: number;
}

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.scss']
})
export class DisplayerComponent implements OnInit, AfterContentInit, OnChanges {

  @ViewChild('grid') grid: MatGridList;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() searchTerm: string;
  @Input() selectedRegion: string;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1
  };

  pageSizeOptions = [8, 10, 20, 40];
  CURRENCY_CACHES: Country[] = [];
  currencyDB: Country[] = [];
  currencyList = [];
  isLoading: boolean;
  size = 0;

  constructor(
    private currenciesService: CurrenciesService,
    private observableMedia: ObservableMedia) { }

  ngOnInit() {
    this.isLoading = true;
    this.currenciesService.getAllCountry()
      .subscribe(resp => {
        this.CURRENCY_CACHES = resp;

        this.getPaginatedData({
          pageIndex: 0,
          pageSize: this.pageSizeOptions[0]
        });
      });
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable()
      .subscribe((change: MediaChange) => {
        this.grid.cols = this.gridByBreakpoint[change.mqAlias];
      });
  }

  getPaginatedData(params?: PaginatedParams) {
    this.isLoading = true;

    let pageIndex = params.pageIndex || this.paginator.pageIndex;
    let pageSize = params.pageSize || this.paginator.pageSize;
    let searchTerm = params.searchTerm || this.searchTerm;
    let selectedRegion = params.selectedRegion || this.selectedRegion;

    this.currencyDB = [...this.CURRENCY_CACHES];

    if (searchTerm && searchTerm.trim()) {
      const filter = searchTerm.trim().toLowerCase();

      this.currencyDB = this.currencyDB.filter(country => {
        return country.name.trim().toLowerCase().search(filter) >= 0 ||
          country.capital.trim().toLowerCase().search(filter) >= 0;
      });
    }

    if (selectedRegion && selectedRegion.trim()) {
      const region = selectedRegion.trim().toLowerCase();

      this.currencyDB = this.currencyDB.filter(r => r.region.trim().toLowerCase().search(region) >= 0);
    }

    let index = 0;
    let startingIndex = pageIndex * pageSize;
    let endingIndex = startingIndex + pageSize;

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

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      const change = changes[propName];

      if (!change.firstChange) {
        const val = change.currentValue;

        this.getPaginatedData({
          [propName]: val
        });
      }
    }

  }
}
