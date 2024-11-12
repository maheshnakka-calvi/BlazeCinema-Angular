import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../models/movie.interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="movie-card">
      <img
        *ngIf="movie.poster_path"
        [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        [alt]="movie.title"
        class="movie-poster"
      />
      <div *ngIf="!movie.poster_path" class="movie-poster no-poster">
        No poster available
      </div>
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="movie-overview">{{ movie.overview | slice:0:100 }}{{ movie.overview.length > 100 ? '...' : '' }}</p>
        <p>Release Date: {{ movie.release_date | date }}</p>
        <p>Rating: {{ movie.vote_average | number:'1.1-1' }}/10</p>
      </div>
    </div>
  `
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}