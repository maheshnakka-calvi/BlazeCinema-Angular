import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="app-header">
      <div class="header-content">
        <a [routerLink]="['/']" class="logo">BlazeCinema</a>
      </div>
    </header>
  `
})
export class HeaderComponent {}