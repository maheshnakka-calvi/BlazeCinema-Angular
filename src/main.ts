import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {}

const routes = [
  {
    path: '',
    loadComponent: () => import('./app/components/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./app/components/movie-details.component').then(m => m.MovieDetailsComponent)
  }
];

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
});