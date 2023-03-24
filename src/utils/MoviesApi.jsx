class MoviesApi {
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

    requestMovies() {
      return fetch
      (this._baseUrl + '/beatfilm-movies', 
      {
        headers: this._headers,
      })
      .then(this._checkHelper)
    }
  }

  export const ApiMovies = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });