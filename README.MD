# DailyBot - Code Test

## Technologies Used
TypeScript (ts): Taking into account that the vacancy is for typing, my chosen language was this.

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

* Get Similar Movies: It filters movies by genre and, if there are more than 5 movies, also filters by actors, but if in the filter by actors there are less than 2 movies, it returns the movies filtered by genre. Then go to filter by imdb rating taking a proximity of 1.5 points, but again if there are less than 2 movies, it returns the movies filtered before.  

* Console App: I chose to use the console to be able to show the results in a simple way, a next improvement to the program would be a simple web interface.

* Tests: I have attempted to cover the most important parts of the program with unit tests. However, due to time constraints, I couldn't cover all aspects, such as console app functionality. Given more time, I would expand the test suite to cover those areas and ensure comprehensive test coverage.



