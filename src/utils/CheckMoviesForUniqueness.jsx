export function checkMoviesForUniqueness(saveMovies) {
  const newMoviesLMap = new Map();

  saveMovies.map((movies) => newMoviesLMap.set(movies.movieId, movies));

  const newMoviesList = [];
  newMoviesLMap.forEach((movie) => {
    return newMoviesList.push(movie);
  });

  return newMoviesList;
}