import { Component, inject, LOCALE_ID } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "src/app/shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  imports: [NotFoundComponent, CountryInformationComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ]
})
export class CountryPageComponent {
  public countryService = inject(CountryService);

  public countryCode = inject(ActivatedRoute).snapshot.params['code'];

  public countryResource = rxResource({
    params: () => ({ query: this.countryCode }),
    stream: ({ params }) => {
      if (!params.query) return of();
      return this.countryService.searchByCode(params.query);
    }
  });
}
