import { Component } from '@angular/core';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListTableComponent } from "../../components/list-table/list-table.component";

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  imports: [SearchInputComponent, ListTableComponent],
})
export class ByCountryComponent {
  onSearch(value: string) {
    console.log(value)
  }
}
