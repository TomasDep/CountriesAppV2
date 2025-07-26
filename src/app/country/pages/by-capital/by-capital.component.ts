import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListTableComponent } from "../../components/list-table/list-table.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  imports: [SearchInputComponent, ListTableComponent],
})
export class ByCapitalComponent implements OnInit {
  public countryService = inject(CountryService);
  public activatedRoue = inject(ActivatedRoute);
  public router = inject(Router);

  public isLoading = signal(false);
  public isError = signal<string|null>(null);
  public countries = signal<Country[]>([]);

  public queryParam = this.activatedRoue.snapshot.queryParamMap.get('query') ?? '';

  ngOnInit(): void {
    if (this.queryParam && this.queryParam.length > 1) {
      this.onSearch(this.queryParam);
    }
  }

  public onSearch(value: string): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.router.navigate(['/country/by-capital'], {
      queryParams: {
        query: value
      }
    });

    this.countryService.searchByCapital(value).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        console.log(err.cause);
        this.isError.set(err.cause);
      }
    });
  }
}
