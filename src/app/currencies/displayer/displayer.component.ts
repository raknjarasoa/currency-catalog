// Afficheur des currencies
import { AfterContentInit, OnInit, Component, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatPaginator } from "@angular/material";

import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';

import { Country } from '../models';
import { CurrenciesService } from '../services';

export interface PaginatedParams {
  selectedFiltre?: string;
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
  @Input() selectedFiltre: string;

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

  getFilters(sTerm: string, sFilter: string) {
    let filtreValue = '';
    let searchTerm = '';

    if (sFilter && sFilter.trim()) {
      filtreValue = sFilter.trim();
    }

    if (sTerm && sTerm.trim()) {
      searchTerm = sTerm.trim().toLowerCase();
    }

    return {
      searchTerm,
      filtreValue
    }
  }

  getPaginatedData(params?: PaginatedParams) {
    this.isLoading = true;

    let sTerm = params.searchTerm || this.searchTerm;
    let sFiltre = params.selectedFiltre || this.selectedFiltre;

    this.currencyDB = [...this.CURRENCY_CACHES];

    const { filtreValue, searchTerm } = this.getFilters(sTerm, sFiltre);

    this.currencyDB = this.currencyDB.filter(country => {
      if (!filtreValue && searchTerm) {
        return  country.name.toLowerCase().search(searchTerm) >= 0 ||
                country.capital.toLowerCase().search(searchTerm) >= 0 ||
                country.currencies[0].name.toLowerCase().search(searchTerm) >= 0 ||
                (country.currencies[0] &&
                  country.currencies[0].code &&
                  country.currencies[0].code.toLowerCase().search(searchTerm) >= 0);
      }
      if (filtreValue && searchTerm) {
        return (country.currencies[0] &&
                country.currencies[0][filtreValue] &&
                country.currencies[0][filtreValue].toLowerCase().search(searchTerm) >= 0);
      }
      return true;
    });    

    let index = 0;
    let pageIndex = params.pageIndex;
    let pageSize = params.pageSize || this.paginator.pageSize;
    
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
          [propName]: val,
          pageIndex: 0
        });
      }
    }

  }
}
