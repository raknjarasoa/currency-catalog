import { Currency } from './currency.model';

export class Country {
  currencies: Array<Currency>;
  latlng: Array<number>;
  population: number;
  flag: string;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
}
