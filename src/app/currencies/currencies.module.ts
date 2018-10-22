import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from '../app-material.module';
import { ApiModule } from '../api/api.module';

import { DisplayerComponent } from './displayer/displayer.component';
import { OneCurrencyComponent } from './one-currency/one-currency.component';
import { CurrencyComponent } from './currency.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    
    AppMaterialModule,
    ApiModule
  ],
  declarations: [
    DisplayerComponent,
    OneCurrencyComponent,
    CurrencyComponent,
    DetailComponent
  ],
  exports: [
    CurrencyComponent
  ]
})
export class CurrenciesModule { }
