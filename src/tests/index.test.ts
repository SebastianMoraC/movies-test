import { MovieService } from "../movies/MovieService";
import { Movie } from "../movies/Movie";
import readline from "readline";
import moviesData from "../data/movies-database-v2.json";

jest.mock("readline");

describe("MovieService App", () => {
  let movieService: MovieService;

  beforeEach(() => {
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

    movieService = new MovieService(movies);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("main", () => {
    it("should exit when option 4 is selected", async () => {
      const mockQuestion = jest.fn();
      mockQuestion.mockReturnValueOnce(Promise.resolve("4")); // Simulate selecting option 4 (Exit)

      const mockLog = jest.spyOn(console, "log");
      const mockClose = jest.spyOn(readline.Interface.prototype, "close");

      await main();

      expect(mockQuestion).toHaveBeenCalledTimes(1);
      expect(mockLog).toHaveBeenCalledWith("Exiting the application...");
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("should display an error when the reference movie is not found", async () => {
      const mockQuestion = jest.fn();
      mockQuestion.mockReturnValueOnce(Promise.resolve("2")); // Simulate selecting option 2 (Get similar movies)
      mockQuestion.mockReturnValueOnce(Promise.resolve("Unknown Movie")); // Simulate entering an unknown movie title

      const mockLog = jest.spyOn(console, "log");

      await main();

      expect(mockQuestion).toHaveBeenCalledTimes(2);
      expect(mockLog).toHaveBeenCalledWith("ERROR: Movie not found.");
    });

    // Add more test cases for other options in the main function
  });

  // Add more test cases for other methods in the MovieService class
});
