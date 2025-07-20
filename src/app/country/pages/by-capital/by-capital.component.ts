import { Component, inject, signal } from '@angular/core';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListTableComponent } from "../../components/list-table/list-table.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  imports: [SearchInputComponent, ListTableComponent],
})
export class ByCapitalComponent {
  public countryService = inject(CountryService);

  public isLoading = signal(false);
  public isError = signal<string|null>(null);
  public countries = signal<Country[]>([]);

  public onSearch(value: string): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(value).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      }
    });
  }
}
