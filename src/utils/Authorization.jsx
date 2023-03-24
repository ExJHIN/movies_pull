export const BASE_URL = `https://vpm-movies.nomoredomains.work`;

const checkHelper = (res) => {
    if (res.ok) {
      console.log(res);
      return res.json()}
    else {
      return Promise.reject(`Ошибка: ${res.status}`)};
  };

export const gettingUserInfo = (token) => {
    return fetch
    (`${BASE_URL}/users/me`,
    {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      credentials: 'include',
    })
    .then(checkHelper)
};

export const createUser = ( name, email, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json" 
    },
    method: "POST",
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  })
  .then(checkHelper);
};

export const login = ( email, password ) => {
  return fetch
  (`${BASE_URL}/signin`, 
  {
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json" 
    },
    method: "POST",
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  .then(checkHelper);
};