export class Movie {
  constructor(
    public title: string,
    public genres: string[],
    public posterUrl: string,
    public year: number,
    public cast: string[],
    public imdbRating: number
  ) {}
}
