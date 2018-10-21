import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiModule } from './api.module';

@Injectable({
  providedIn: ApiModule
})
export class ApiService {

  constructor() { }

  logInfo(log) {
    console.log(`LOGGER: ${log}`);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`FAILED ${operation}: ${error.message}`);
      return of(result as T);
    };
  }

}
