import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from '../app-material.module';
import { ApiModule } from '../api/api.module';

import { DisplayerComponent } from './displayer/displayer.component';
import { OneCurrencyComponent } from './one-currency/one-currency.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    
    AppMaterialModule,
    ApiModule
  ],
  declarations: [
    DisplayerComponent,
    OneCurrencyComponent
  ],
  exports: [
    DisplayerComponent
  ]
})
export class CurrenciesModule { }
