import { Component, effect, input, output, signal } from '@angular/core';

const DEBOUNCE_TIME = 500;

@Component({
  selector: 'country-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  public searchValue = output<string>();
  public placeholder = input.required<string>();

  public inputValue = signal<string>('');

  public debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    if (!value) return;

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, DEBOUNCE_TIME);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
