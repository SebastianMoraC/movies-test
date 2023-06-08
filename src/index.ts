/* eslint-disable no-case-declarations */
import { Movie } from "./movies/Movie";
import { MovieService } from "./movies/MovieService";

import moviesData from "./data/movies-database-v2.json";
import readline from "readline";

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
const movieService = new MovieService(movies);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
} 
async function main() {
  console.log("Welcome to the Movie Service App!");

  let selectedOption = "";
  while (selectedOption !== "4") {
    console.log("\nPlease select an option:");
    console.log("1. Get movies by popularity");
    console.log("2. Get similar movies");
    console.log("3. Get movies with the same actor");
    console.log("4. Exit");

    selectedOption = await askQuestion("Option: ");

    switch (selectedOption) {
      case "1":
        const popularMovies = movieService.getMoviesByPopularity();
        console.log("\nPopular Movies:");
        popularMovies.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });
        break;
      case "2":
        const referenceMovieTitle = await askQuestion(
          "Enter the reference movie title: "
        );

        const referenceMovie = movies.find(
          (movie) =>
            movie.title.toLowerCase() === referenceMovieTitle.toLowerCase()
        );

        if (!referenceMovie) {
          console.log("ERROR: Movie not found.");
          break;
        }

        const similarMovies = movieService.getSimilarMovies(
          referenceMovie,
        );

        console.log("\nSimilar Movies:");
        similarMovies.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });
        break;
      case "3":
        const actor = await askQuestion("Enter the actor name: ");

        const moviesWithSameActor = movieService.getMoviesWithSameActor(actor);

        console.log("\nMovies with the Same Actor:");
        moviesWithSameActor.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });
        break;
      case "4":
        console.log("Exiting the application...");
        break;
      default:
        console.log("Invalid option. Please try again.");
        break;
    }
  }

  rl.close();
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
