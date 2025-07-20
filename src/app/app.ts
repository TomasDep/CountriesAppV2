import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, FooterComponent]
})
export class App {
  protected readonly title = signal('CountryAppV2');
}
