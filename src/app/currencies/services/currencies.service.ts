import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';

import { ApiService } from '../../api/api.service';
import { Country } from '../models';

import { environment } from '../../../environments/environment';

const API_ENDPOINT = `${environment.API_ENDPOINT}/all?fields=name;alpha2Code;alpha3Code;capital;region;subregion;population;latlng;currencies;flag`;

const CACHE_SIZE = 1;

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private cache$: Observable<Array<Country>>;

  constructor(
    private apiService: ApiService,
    private http: HttpClient) { }

  get currencies() {
    if (!this.cache$) {
      this.cache$ = this.getAllCountry()
        .pipe(
          shareReplay(CACHE_SIZE)
        );
    }

    return this.cache$;
  }

  getAllCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(API_ENDPOINT, httpOptions)
      .pipe(
        map(resp => resp),
        tap(_ => console.log(`Load successful!`)),
        catchError(this.apiService.handleError('getAllCountry', []))
      );
  }
}
