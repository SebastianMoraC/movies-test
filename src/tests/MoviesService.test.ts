import { MovieService } from "../movies/MovieService";
import { Movie } from "../movies/Movie";
import moviesData from "../data/movies-database-v2.json";
let movies: Movie[] = [];
describe("MovieService", () => {
  let movieService: MovieService;

  beforeEach(() => {
    movies = moviesData.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (movie: any) =>
        new Movie(
          movie.title,
          movie.genres,
          movie.posterurl,
          movie.year,
          movie.actors,
          movie.imdbRating
        )
    );
    movieService = new MovieService(movies);
  });
  describe("getMoviesByPopularity", () => {
    it("should return movies sorted by IMDb rating in descending order", () => {
      const sortedMovies = movieService.getMoviesByPopularity();
      const isSorted = sortedMovies.every(
        (movie, index) =>
          index === 0 || movie.imdbRating <= sortedMovies[index - 1].imdbRating
      );
      expect(isSorted).toBe(true);
    });
  });
  describe("getMoviesWithSameActor", () => {
    it("should return movies with the same actor", () => {
      const actor = "Lisa Kudrow";
      const moviesWithSameActor = movieService.getMoviesWithSameActor(actor);
      const isSameActor = moviesWithSameActor.every((movie) =>
        movie.cast.includes(actor)
      );
      expect(isSameActor).toBe(true);
    });
  });
  describe("getSimilarMovies", () => {
    it("should return similar movies based on genre", () => {
      const referenceMovie: Movie = movies[0];
      const similarMovies = movieService.getSimilarMovies(referenceMovie);

      expect(similarMovies).not.toContain(referenceMovie);

      const hasSimilarGenres = similarMovies.every((movie) =>
        movie.genres.some((genre) => referenceMovie.genres.includes(genre))
      );
      expect(hasSimilarGenres).toBe(true);
    });
    it("should return similar movies based on their imdb rating", () => {
      const MAX_IMDB_DIFFERENCE = 1.5;
      const referenceMovie = movies[2];
      console.log(referenceMovie);
      const similarMovies = movieService.getSimilarMovies(referenceMovie);
      const hasSimilarRating = similarMovies.every(
        (movie) =>
          Math.abs(movie.imdbRating - referenceMovie.imdbRating) <=
          MAX_IMDB_DIFFERENCE
      );
      expect(hasSimilarRating).toBe(true);
    });
    it("should return max 5 similar movies", () => {
      const referenceMovie = movies[0];
      const similarMovies = movieService.getSimilarMovies(referenceMovie);
      expect(similarMovies.length).toBeLessThanOrEqual(5);
    });
    it("should return movies with the same actor if there are more than 5 movies with the same genre", () => {
      const mockMoviesArr = [
        {
          title: "Movie 1",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 6"],
          imdbRating: 8.5,
        },
        {
          title: "Movie 2",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 1", "Actor 3"],
          imdbRating: 8.5,
        },
        {
          title: "Movie 3",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 1", "Actor 4"],
          imdbRating: 8.5,
        },
        {
          title: "Movie 4",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 1", "Actor 5"],
          imdbRating: 8.5,
        },
        {
          title: "Movie 5",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 1", "Actor 6"],
          imdbRating: 8.5,
        },
        {
          title: "Movie 6",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 6", "Actor 7"],
          imdbRating: 8.5,
        },
        {
          title: "Movie 7",
          genres: ["Action", "Comedy"],
          posterurl: "url",
          year: 1994,
          actors: ["Actor 4", "Actor 8"],
        },
      ];
      const mockMovies = mockMoviesArr.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (movie: any) =>
          new Movie(
            movie.title,
            movie.genres,
            movie.posterurl,
            movie.year,
            movie.actors,
            movie.imdbRating
          )
      );
      const mockMovieService = new MovieService(mockMovies);
      const referenceMovie =
        mockMovies[0]; /* A movie with more than 5 movies with the same genre */
      const similarMovies = mockMovieService.getSimilarMovies(referenceMovie);
      const hasSameActor = similarMovies.every((movie) =>
        movie.cast.some((actor) => referenceMovie.cast.includes(actor))
      );
      expect(hasSameActor).toBe(true);
    });
  });
});
