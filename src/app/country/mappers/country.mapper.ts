import type { Country } from "../interfaces/country.interface"
import type { RestCountryResponse } from "../interfaces/rest-country.interface"

const TRANSLATION = 'spa';

export class CountryMapper {
  public static mapRestCountriesItemToCountry(restCountryResp: RestCountryResponse): Country {
    return {
      cca2: restCountryResp.cca2,
      flag: restCountryResp.flag,
      svg: restCountryResp.flags.svg,
      name: restCountryResp.translations[TRANSLATION].common ?? restCountryResp.name,
      capital: restCountryResp.capital.join(' '),
      population: restCountryResp.population
    };
  }

  public static mapRestCountriesItemsToCountryArray(restCountryResp: RestCountryResponse[]): Country[] {
    return restCountryResp.map(this.mapRestCountriesItemToCountry);
  }
}
