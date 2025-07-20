import { Component } from '@angular/core';

import { ListTableComponent } from "../../components/list-table/list-table.component";

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  imports: [ListTableComponent],
})
export class ByRegionComponent { }
