import { useState, useEffect } from 'react';
import { HeaderAuthorized } from '../../ui/HeaderAuthorized';
import '../Main/Main.css';
import { SearchForm } from '../../components/SearchForm/index';
import { MoviesCardList } from '../Movies/components/MoviesCardList/index';
import { Footer } from '../../ui/Footer/index';
import { Api } from '../../utils/MainApi';
import { Preloader } from '../Movies/components/Preloader/index';
import { checkMoviesForUniqueness } from '../../utils/CheckMoviesForUniqueness';
import './SavedMovies.css';

export function SavedMovies() {

// const currentUser = useContext(CurrentUserContext);

const [movies, setMovies] = useState([]);

const [preloadMovies, setPreloadMovies] = useState(false);

const [countMoviesShowMore, setCountMoviesShowMore] = useState([]);
const [hiddenMovies, setHiddenMovies] = useState([]);

const [saveMovies, setSaveMovies] = useState(null);

const [shortFilmsCheckbox, setShortFilmsCheckbox] = useState([]);

const [moviesSearchForm, setMoviesSearchForm] = useState('');

const [MoviesCheckbox, setMoviesCheckbox] = useState(false);



async function onChangeGetMoviesHandler(isInputValue, checkbox) {
  // setErrorText('');
  setPreloadMovies(true);
  try {
    const data = movies;
    let registerFilter = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(isInputValue.toLowerCase()));

    if (checkbox) {
      registerFilter = registerFilter.filter(({ duration }) => duration <= 40);
    }
    setMovies(registerFilter);
  } catch (err) {
    // setErrorText(addErrorMovies);
    setMovies([]);

  } finally {
    setPreloadMovies(false);
  }
}

async function onChangeGetMoviesOnCheckboxActive(checkbox) {
  let filterHiddenMovies = [];

  let mainDataFilter= [];

  let MoviesArr = movies;

  if (checkbox) {
    setShortFilmsCheckbox(hiddenMovies);
    setMoviesCheckbox(MoviesArr);
    mainDataFilter= MoviesArr.filter(({ duration }) => duration <= 40);
  } else {
    filterHiddenMovies = shortFilmsCheckbox;
    mainDataFilter = MoviesCheckbox;
  }
  setMovies(mainDataFilter);
  setHiddenMovies(filterHiddenMovies);
}

async function onGetSaveMoviesMe() {
  const arrayMoviesSearchForm = localStorage.getItem('savedMovies');
  if (arrayMoviesSearchForm) {
    setMovies(checkMoviesForUniqueness(JSON.parse(arrayMoviesSearchForm)));
  } else {
    try {
      const data = await Api.readMoviesMe();
      setMovies(checkMoviesForUniqueness(data));
      setHiddenMovies(data);
    } catch (err) {
      console.log(err);
    }
  }
}

async function onClickDeleteMoviesHandler(movie,save) {
  if (!save) {
    try {
      await Api.deleteMovie(movie._id);
      const newFilms = await Api.readMoviesMe();
      setHiddenMovies(newFilms);
      setMovies(newFilms);
    } catch (err) {
      console.log(err);
    }
  }
}

useEffect(() => {
  onGetSaveMoviesMe();
}, [saveMovies]);


    return (
      <>
        <HeaderAuthorized />
        <main className="main_container">
          <SearchForm 
            onChangeGetMoviesHandler={onChangeGetMoviesHandler}
            onChangeGetMoviesOnCheckboxActive={onChangeGetMoviesOnCheckboxActive}
          />
          {preloadMovies 
              ? <Preloader />
              : <></>
            }
          <MoviesCardList 
            movie={hiddenMovies}
            movies={movies}
            hiddenMovies={hiddenMovies}
            onClickDeleteMoviesHandler={onClickDeleteMoviesHandler}
          />
        </main>
        <Footer/>
      </>
    );
  }
