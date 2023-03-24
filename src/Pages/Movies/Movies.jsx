import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { HeaderAuthorized } from '../../ui/HeaderAuthorized';
import { SearchForm } from '../../components/SearchForm/index';
import { MoviesCardList } from './components/MoviesCardList/index';
import { Footer } from '../../ui/Footer/index';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ApiMovies } from '../../utils/MoviesApi';
import { Preloader } from '../Movies/components/Preloader/index';
import { Api } from '../../utils/MainApi';
import { checkMoviesForUniqueness } from '../../utils/CheckMoviesForUniqueness';

import '../Main/Main.css';
import './Movies.css';

export function Movies() {
const currentUser = useContext(CurrentUserContext);
const  path  = useLocation();
const [movies, setMovies] = useState([]);
const [preloadMovies, setPreloadMovies] = useState(false);
const [countMoviesShowMore, setCountMoviesShowMore] = useState([]);
const [hiddenMovies, setHiddenMovies] = useState([]);
const [saveMovies, setSaveMovies] = useState([]);
const [shortFilmsCheckbox, setShortFilmsCheckbox] = useState([]);
const [moviesSearchForm, setMoviesSearchForm] = useState('');
const [MoviesCheckbox, setMoviesCheckbox] = useState(false);
const [addedActive, setAddedActive] = useState(false);

function getDynamicMovies() {
  let adaptiveCount;
  const width = window.innerWidth;
  const config = {'1200': [12, 3], '900': [9, 3],'768': [8, 2],'240': [5, 2]};
  Object.keys(config).sort((a, b) => a - b).forEach((key) => {
      if (width > +key) {
        adaptiveCount = config[key];
      }
    });
  return adaptiveCount;
}

useEffect(() => {
  setCountMoviesShowMore(getDynamicMovies());
  const handlerResize = () => setCountMoviesShowMore(getDynamicMovies());
  window.addEventListener('resize', handlerResize);

  return () => {
    window.removeEventListener('resize', handlerResize);
  };
}, []);

function onChangeShowMoreHandler() {
  let MoviesArr = movies;
  let showMoreMovies = (MoviesArr).concat(hiddenMovies.splice(0, countMoviesShowMore[1]));
  setMovies(showMoreMovies);
}

async function onChangeGetMoviesOnCheckboxActive(checkbox) {
  let filterHiddenMovies = [];

  let mainDataFilter= [];

  let MoviesArr = movies;

  if (checkbox) {
    setShortFilmsCheckbox(hiddenMovies);
    setMoviesCheckbox(MoviesArr);
    mainDataFilter= MoviesArr.filter(({ duration }) => duration <= 40).concat(hiddenMovies.filter(({ duration }) => duration <= 40));
  } else {
    filterHiddenMovies = shortFilmsCheckbox;
    mainDataFilter = MoviesCheckbox;
  }
  setMovies(mainDataFilter);
  setHiddenMovies(filterHiddenMovies);
}

async function onChangeGetMoviesHandler(isInputValue) {
  setShortFilmsCheckbox(false);
  localStorage.setItem('shortFilmsCheckbox', false);

  if (!isInputValue) {
    return false;
  }
  
  setPreloadMovies(true);

  try {
    const data = await ApiMovies.requestMovies();
    let registerFilter = data.filter((
      { nameRU }) => nameRU.toLowerCase().includes(isInputValue.toLowerCase()
      ));
      
    localStorage.setItem('searchForm', isInputValue);
    localStorage.setItem('movies', JSON.stringify(registerFilter));
    const registerFilterData = registerFilter.splice(0, countMoviesShowMore[0]);
    setMovies(registerFilterData);
    
    setHiddenMovies(registerFilter);
    setShortFilmsCheckbox(registerFilterData);
    setMoviesCheckbox(registerFilter);
  } catch (err) {
    setMovies([]);
    localStorage.removeItem('movies');
    localStorage.removeItem('moviesCheckbox');
    localStorage.removeItem('searchForm');
  } finally {
    setPreloadMovies(false);
  }
}

async function onClickSavedMovies(movie, save) {
  localStorage.setItem('save', save);
  if (save) {
    const dataMovies = {
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      country: movie.country || 'Неизвестно',
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    try {
      await Api.createMovie(dataMovies);
      const afterSaved = await Api.readMoviesMe();
      setSaveMovies(checkMoviesForUniqueness(afterSaved));
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await Api.deleteMovie(movie._id);
      const beforeSaved = await Api.readMoviesMe();
      setSaveMovies(checkMoviesForUniqueness(beforeSaved));
    } catch (err) {
      console.error(err);
    }
  }
}

  useEffect(() => {
    ApiMovies.requestMovies()
      .then((dataMovies) => {
        setSaveMovies(dataMovies);
      })
      .catch((err) => {
        console.error(err);
      });

    const arrayMovies = localStorage.getItem('movies');
    
    if (arrayMovies) 
    {
      const registerFilter = JSON.parse(arrayMovies);
      setSaveMovies(registerFilter.splice(0, getDynamicMovies()[0]));
      setHiddenMovies(registerFilter);
      setPreloadMovies(false);
    }

    const arrayMoviesOnCheckBox = localStorage.getItem('moviesCheckbox');
    const arrayMoviesSearchForm = localStorage.getItem('searchForm');

    if (arrayMoviesOnCheckBox) {
      setMoviesCheckbox(arrayMoviesOnCheckBox === 'true');
    }

    if (arrayMoviesSearchForm) {
      setMoviesSearchForm(arrayMoviesSearchForm);
    }
  }, [moviesSearchForm]);




    return (
      <>
        <HeaderAuthorized />
          <main className="main_container">
            <SearchForm 
              onChangeGetMoviesHandler={onChangeGetMoviesHandler} 
              shortFilmsCheckbox={shortFilmsCheckbox}
              moviesSearchForm={moviesSearchForm}
              onChangeGetMoviesOnCheckboxActive={onChangeGetMoviesOnCheckboxActive}
              MoviesCheckbox={MoviesCheckbox}
            />
            {preloadMovies 
              ? <Preloader />
              : <></>
            }
            <MoviesCardList 
              onChangeShowMoreHandler={onChangeShowMoreHandler}
              movies={movies}
              hiddenMovies={hiddenMovies}
              countMoviesShowMore={countMoviesShowMore}
              onClickSavedMovies={onClickSavedMovies}
              saveMovies={saveMovies}
              addedActive={addedActive}
            />
          </main>
        <Footer/>
      </>
    );
  }
