import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  public searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RestCountryResponse[]>(`${environment.countriesAPi}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountriesItemsToCountryArray(resp)),
        catchError(error => {
          console.log('Error fetch', error);
          return throwError(() => new Error(`No se pudo obtener paises con ${query}`));
        })
      );
  }
}
