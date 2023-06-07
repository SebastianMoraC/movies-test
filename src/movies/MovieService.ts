import { Movie } from "./Movie";

export class MovieService {
  private movies: Movie[];

  constructor(movies: Movie[]) {
    this.movies = movies;
  }
  getMovies = () => this.movies;
  getMoviesByPopularity = () => this.movies.sort((a, b) => b.imdbRating - a.imdbRating);

}