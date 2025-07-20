import { Component, input, LOCALE_ID } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  templateUrl: './list-table.component.html',
  imports: [DecimalPipe],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ]
})
export class ListTableComponent {
  public countries = input.required<Country[]>();
}
