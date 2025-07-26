import { DecimalPipe } from '@angular/common';
import {Component, computed, input } from '@angular/core';

import { Country } from 'src/app/country/interfaces/country.interface';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  public country = input.required<Country>()

  public currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
