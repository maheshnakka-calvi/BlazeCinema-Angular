import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        placeholder="Search for movies..."
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
      />
    </div>
  `
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm = '';
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.search.emit(searchTerm);
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }
}