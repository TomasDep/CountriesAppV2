import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../types/region.type';

const DELAY = 2000;

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCacheCountry = new Map<string, Country[]>();
  private readonly queryCacheRegion = new Map<string, Country[]>();

  public searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RestCountryResponse[]>(`${environment.countriesAPi}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountriesItemsToCountryArray(resp)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        delay(DELAY),
        catchError(error => {
          console.error('Error fetch', error);
          const errorMessage = `No se pudo obtener paises con ${query}`;
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RestCountryResponse[]>(`${environment.countriesAPi}/name/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountriesItemsToCountryArray(resp)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        delay(DELAY),
        catchError(error => {
          console.error('Error fetch', error);
          const errorMessage = `No se pudo obtener el pais de nombre ${query}`;
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  public searchByCode(code: string): Observable<Country | undefined> {
    code = code.toLowerCase();
    return this.http.get<RestCountryResponse[]>(`${environment.countriesAPi}/alpha/${code}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountriesItemsToCountryArray(resp)),
        map(countries => countries.at(0)),
        catchError(error => {
          console.error('Error fetch', error);
          const errorMessage = `No se pudo obtener el pais de nombre ${code}`;
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  public searchByRegion(region: Region): Observable<Country[] | undefined> {
    const searchRegion = region.toLowerCase();

    if (this.queryCacheRegion.has(searchRegion)) {
      return of(this.queryCacheRegion.get(searchRegion) ?? []);
    }

    return this.http.get<RestCountryResponse[]>(`${environment.countriesAPi}/region/${searchRegion}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountriesItemsToCountryArray(resp)),
        tap(countries => this.queryCacheRegion.set(searchRegion, countries)),
        delay(DELAY),
        catchError(error => {
          console.error('Error fetch', error);
          const errorMessage = `No se pudo obtener el paises con la region ${region}`;
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
