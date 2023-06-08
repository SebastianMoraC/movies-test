# DailyBot - Code Test

## Technologies Used
TypeScript (ts): Taking into account that the vacancy is for TypeScript, my chosen language was this.

Jest: I chose jest for the unit tests.

Babel: I'm using babel to be able to use jest.

Linter: I'm using standard-ts to check the code for style and best practices.

## Project Setup and Scripts
To run the project, follow these steps:

1. Install dependencies:


```shell
npm install
```

2. Run tests:

Copy code
```shell
npm test
```

3. Run the application:
```shell
npm start
```

## Decisions

* Get Similar Movies: The getSimilarMovies method filters movies by genre and, if there are more than 5 movies, it further filters them by actors. However, if there are less than 2 movies remaining after the actor filter, it returns the movies filtered by genre only. After the filtering process, the method calculates the similarity scores based on the IMDb rating, considering a proximity of 1.5 points. If there are less than 2 movies remaining after the similarity score filter, it returns the movies filtered before. Thus giving priority to the genre and then to the other filters.

* Console App: I chose to implement the movie service as a console application to provide a simple and straightforward way to display the results. However, a future improvement could be to develop a simple web interface.

* Tests: I have attempted to cover the most important parts of the program with unit tests. The tests focus on the logic and algorithms of the MovieService class. However, due to time constraints, I couldn't cover all aspects, such as console app functionality. Given more time, I would expand the test suite to cover those areas and ensure comprehensive test coverage.

You can use tests or console app to test the application.



