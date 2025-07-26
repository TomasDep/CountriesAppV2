import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';

import { ListTableComponent } from "../../components/list-table/list-table.component";
import { Region } from '../../types/region.type';
import { CountryService } from '../../services/country.service';
@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  imports: [ListTableComponent],
})
export class ByRegionComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  public countryService = inject(CountryService);
  public activatedRoue = inject(ActivatedRoute);
  public router = inject(Router);

  public selectedRegion = linkedSignal<Region|null>(() => this.regions.find(r => r === this.queryParam) ?? null);

  public queryParam = this.activatedRoue.snapshot.queryParamMap.get('query') ?? '';

  public countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.region
        }
      });
      return this.countryService.searchByRegion(params.region);
    }
  });
}
