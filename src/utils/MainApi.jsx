const validator = require('validator');

class MainApi {
  constructor({baseUrl, headers, credentials}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this.credentials = credentials;
  } 

  _checkHelper(res) {
    if (res.ok) {
      console.log(res);
      return res.json()}
    else {
      return Promise.reject(`Ошибка: ${res.status}`)};
  };

  readMoviesMe() {
    return fetch(this._baseUrl + "/movies", {
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkHelper)
  }

  gettingUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkHelper)
  }

  updateUser(name,email) {
    return fetch(this._baseUrl + "/users/me",{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
          name,
          email
        }),
    credentials: 'include',
    })
    .then(this._checkHelper)
  }

  createMovie(dataMovies) {
    return fetch
    (this._baseUrl + "/movies",
    {
      method: "POST",
      headers: this._headers,
      // body: JSON.stringify({
      //   country: dataMovies.country,
      //   director: dataMovies.director,
      //   duration: dataMovies.duration,
      //   year: dataMovies.year,
      //   description: dataMovies.description,
      //   image: dataMovies.image,
      //   trailerLink: (validator.isURL(dataMovies.trailerLink) 
      //       ? dataMovies.trailerLink 
      //       : 'https://www.youtube.com/'),
      //   nameRU: dataMovies.nameRU,
      //   nameEN: dataMovies.nameEN,
      //   thumbnail: dataMovies.thumbnail,
      //     movieId: dataMovies.id,
      // }),
      body: JSON.stringify(dataMovies),
      credentials: 'include',
    })
    .then(this._checkHelper)
  }

  deleteMovie(_id) {
    return fetch
    (this._baseUrl + "/movies/" + _id,
    {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkHelper)
  }

  updateToken(token) {
    this._headers['Authorization'] = `Bearer ${token}`;
  }
}

const token = localStorage.getItem('jwt');

export const Api = new MainApi({
  baseUrl: `https://vpm-movies.nomoredomains.work`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  credentials: 'include',
});