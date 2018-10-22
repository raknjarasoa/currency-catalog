import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Country } from '../models';
import { CurrenciesService } from '../services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  country: Country;

  constructor(
    private location: Location,
    private currenciesService: CurrenciesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const alphaCode = this.route.snapshot.paramMap.get('alphaCode');
  
    this.currenciesService.currencies
      .subscribe(resp => {
        this.country = resp.find(currency => currency.alpha3Code === alphaCode);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
