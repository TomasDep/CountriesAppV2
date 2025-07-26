import { Component, input, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  templateUrl: './list-table.component.html',
  imports: [DecimalPipe, RouterLink],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ]
})
export class ListTableComponent {
  public countries = input.required<Country[]>();
  public errorMessage = input<any>();
  public isLoading = input<boolean>(false);
  public isEmpty = input<boolean>(false);
}
