import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayerComponent } from './displayer/displayer.component';
import { OneCurrencyComponent } from './one-currency/one-currency.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DisplayerComponent, OneCurrencyComponent]
})
export class CurrenciesModule { }
