import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from './movie-card.component';
import { SearchComponent } from './search.component';
import { HeaderComponent } from './header.component';
import { Movie } from '../models/movie.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieCardComponent, SearchComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="container">
      <app-search (search)="onSearch($event)"></app-search>
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>
      <div *ngIf="loading" class="loading">
        Loading...
      </div>
      <div class="movie-grid" *ngIf="!loading && !error">
        <div *ngFor="let movie of movies" [routerLink]="['/movie', movie.id]" style="cursor: pointer;">
          <app-movie-card [movie]="movie"></app-movie-card>
        </div>
      </div>
      <div *ngIf="!loading && !error && movies.length === 0" class="no-results">
        No movies found
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadPopularMovies();
  }

  private loadPopularMovies() {
    this.loading = true;
    this.error = null;
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  onSearch(query: string) {
    if (query.trim()) {
      this.loading = true;
      this.error = null;
      this.movieService.searchMovies(query).subscribe({
        next: (response) => {
          this.movies = response.results;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
    } else {
      this.loadPopularMovies();
    }
  }
}