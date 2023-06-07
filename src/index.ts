import { Movie } from "./movies/Movie";
import { MovieService } from "./movies/MovieService";

import moviesData from "./data/movies-database-v2.json";

const movies: Movie[] = moviesData.map(
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

const movieService  = new MovieService(movies);

console.log(movieService.getMoviesByPopularity());

