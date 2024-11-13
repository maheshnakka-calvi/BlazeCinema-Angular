import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { HeaderComponent } from './header.component';
import { Movie, WatchProviders } from '../models/movie.interface';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="container" *ngIf="movie">
      <div class="movie-header">
        <img
          *ngIf="movie.backdrop_path"
          [src]="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
          [alt]="movie.title"
          class="backdrop"
        />
        <div class="movie-info-overlay">
          <h1>{{ movie.title }}</h1>
          <div class="movie-meta">
            <span>{{ movie.release_date | date:'yyyy' }}</span>
            <span *ngIf="movie.runtime">• {{ movie.runtime }} min</span>
            <span>• {{ movie.vote_average | number:'1.1-1' }}/10</span>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="main-content">
          <h2>Overview</h2>
          <p>{{ movie.overview }}</p>
          
          <div class="genres" *ngIf="movie.genres">
            <span class="genre-tag" *ngFor="let genre of movie.genres">
              {{ genre.name }}
            </span>
          </div>

        <div class="streaming-section" *ngIf="watchProviders">
          <h2>Where to Watch</h2>
          <div *ngIf="watchProviders" >
            <div *ngIf="watchProviders.results['IN']">
              Find out streaming links <a [href]="watchProviders.results['IN'].link"> here </a>
          </div>
        </div>
          <div class="providers-grid" *ngIf="watchProviders.results['IN']; else noProviders">
            <ng-container *ngIf="watchProviders.results['IN'].flatrate">
              <div class="provider-category">
                <h3>Stream</h3>
                <div class="provider-list">
                  <div class="provider" *ngFor="let provider of watchProviders.results['IN'].flatrate">
                    <img 
                      [src]="'https://image.tmdb.org/t/p/original' + provider.logo_path"
                      [alt]="provider.provider_name"
                      [title]="provider.provider_name"
                    />
                  </div>
                </div>
              </div>
            </ng-container>

            <ng-container *ngIf="watchProviders.results['IN'].rent">
              <div class="provider-category">
                <h3>Rent</h3>
                <div class="provider-list">
                  <div class="provider" *ngFor="let provider of watchProviders.results['US'].rent">
                    <img 
                      [src]="'https://image.tmdb.org/t/p/original' + provider.logo_path"
                      [alt]="provider.provider_name"
                      [title]="provider.provider_name"
                    />
                  </div>
                </div>
              </div>
            </ng-container>

            <ng-container *ngIf="watchProviders.results['IN'].buy">
              <div class="provider-category">
                <h3>Buy</h3>
                <div class="provider-list">
                  <div class="provider" *ngFor="let provider of watchProviders.results['US'].buy">
                    <img 
                      [src]="'https://image.tmdb.org/t/p/original' + provider.logo_path"
                      [alt]="provider.provider_name"
                      [title]="provider.provider_name"
                    />
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
          <ng-template #noProviders>
            <p>No streaming information available for your region.</p>
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class MovieDetailsComponent implements OnInit {
  movie?: Movie;
  watchProviders?: WatchProviders;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovieDetails(+movieId);
    }
  }

  private loadMovieDetails(id: number) {
    this.movieService.getMovieDetails(id).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (error) => {
        this.error = error.message;
      }
    });

    this.movieService.getWatchProviders(id).subscribe({
      next: (providers) => {
        this.watchProviders = providers;
      },
      error: (error) => {
        console.error('Error loading watch providers:', error);
      }
    });
  }
}