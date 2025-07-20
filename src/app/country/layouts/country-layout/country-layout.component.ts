import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'app-country-layout',
  templateUrl: './country-layout.component.html',
  imports: [RouterOutlet, TopMenuComponent],
})
export class CountryLayoutComponent { }
