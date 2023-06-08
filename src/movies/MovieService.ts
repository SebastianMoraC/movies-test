import { Movie } from "./Movie";

export class MovieService {
  private movies: Movie[];

  constructor(movies: Movie[]) {
    this.movies = movies;
  }
  
  getMoviesByPopularity = () =>
    this.movies.sort((a, b) => b.imdbRating - a.imdbRating);

  getSimilarMovies = (referenceMovie: Movie) => {
    // Filter by genre
    const MAX_SIMILAR_MOVIES = 5;
    const MIN_SIMILAR_MOVIES_TO_COMPARE = 2;
    const MAX_IMDB_DIFFERENCE = 1.5;

    let moviesByGenre = this.movies.filter((movie) =>
      movie.genres.some((genre) => referenceMovie.genres.includes(genre) && movie.title !== referenceMovie.title)
    );
    // Filter by actors if there are more than 5 movies and if there are more than 2 movies with the same actors

    if (moviesByGenre.length > MAX_SIMILAR_MOVIES) {
      const movieByActors = this.movies.filter((movie) =>
        movie.cast.some((actor) => referenceMovie.cast.includes(actor))
      );

      moviesByGenre = movieByActors.length <= MIN_SIMILAR_MOVIES_TO_COMPARE ? moviesByGenre : movieByActors;
    }


    // Calculate similarity score

    const similarityScores = moviesByGenre.map((movie) => {
      const imdbDifference = Math.abs(movie.imdbRating - referenceMovie.imdbRating);
      return {
        movie,
        similarityScore: imdbDifference,
      };
    });
    
    const similarMoviesByScore = similarityScores.filter(
      (item) => item.similarityScore <= MAX_IMDB_DIFFERENCE
    ).map((item) => item.movie)
    const similarMovies = similarMoviesByScore.length >= MIN_SIMILAR_MOVIES_TO_COMPARE ? similarMoviesByScore : moviesByGenre;
    return similarMovies.slice(0, MAX_SIMILAR_MOVIES);
  };

  getMoviesWithSameActor = (actor: string) =>
    this.movies.filter((movie) => movie.cast.includes(actor));
}
