export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path?: string | null;
  genres?: Genre[];
  runtime?: number;
  status?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface WatchProviders {
  results: {
    [countryCode: string]: CountryProviders;
  };
}

export interface CountryProviders {
  link: string;
  rent?: Provider[];
  buy?: Provider[];
  flatrate?: Provider[];
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}