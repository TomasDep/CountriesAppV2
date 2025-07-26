import { Component, inject, resource, linkedSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListTableComponent } from "../../components/list-table/list-table.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  imports: [SearchInputComponent, ListTableComponent],
})
export class ByCountryComponent {
  public countryService = inject(CountryService);
  public activatedRoue = inject(ActivatedRoute);
  public router = inject(Router);

  public query = linkedSignal<string>(() => this.queryParam);

  public queryParam = this.activatedRoue.snapshot.queryParamMap.get('query') ?? '';

  /**
   *! (07/2025) EXPERIMENTAL!!! no usar mucho, puede cambiar en un futuro.
   */
  public countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query
        }
      });
      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    }
  });
}
