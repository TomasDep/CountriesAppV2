import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  public searchValue = output<string>();
  public placeholder = input.required<string>();
}
