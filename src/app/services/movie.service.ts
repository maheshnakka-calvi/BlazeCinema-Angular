import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieResponse, Movie, WatchProviders } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {
    if (!this.apiKey || this.apiKey === 'YOUR_TMDB_API_KEY') {
      console.error('Please set your TMDB API key in environment.ts');
    }
  }

  searchMovies(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getWatchProviders(id: number): Observable<WatchProviders> {
    return this.http.get<WatchProviders>(`${this.baseUrl}/movie/${id}/watch/providers`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Invalid API key. Please check your TMDB API key in environment.ts';
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}