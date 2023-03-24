import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import './MoviesCard.css';

export function MoviesCard({ movies, onClickSavedMovies, saveMovies, movie,  hiddenMovies, image, onClickDeleteMoviesHandler, addedActive }) {
const currentUser = useContext(CurrentUserContext);
const  path  = useLocation();
const [save, setSave] = useState('');

function onChangeSaveMovie() {
    const addSaveMovie = !save;
    const arraySave = localStorage.setItem('save', !save);
    const savedFilm = saveMovies.filter((obj) => obj.movieId === movie.id);
    onClickSavedMovies({ ...movie, _id: savedFilm.length  ? savedFilm[0]._id : null }, addSaveMovie);
}

function onClickMovieDelete() {
    onClickDeleteMoviesHandler(movie,save);
}

useEffect(() => {
    if (path.pathname === '/movies') {
      const savedFilm = saveMovies.filter((obj) => obj.movieId === movie.id);
      setSave(!!savedFilm.length);
    }
  }, [ path.pathname, saveMovies, movies]);

const GG = 'https://api.nomoreparties.co';

    return (
        <>
            <article className="movie_card">
                <div className="movie_flex_container">
                    <span className="movie_span_text">{movie.nameRU}</span>
                    <p className="movie_paragraph_text">
                        {Math.floor(movie.duration / 60)}ч&#32;{movie.duration - (Math.floor(movie.duration / 60)) * 60}м
                    </p>
                </div>
                <Link className="movies_image_button" to={movie.trailerLink} target="_blank">
                    { path.pathname === '/saved-movies' 
                        ? (<img  className="movie_cover"  src={image} alt={movie.nameRU}/>)
                        : (<img  className="movie_cover"  src={GG+`${movie.image.url}`} alt={movie.nameRU}/>)
                    }
                </Link>
                { path.pathname === '/saved-movies' 
                        ? (<button className={ path.pathname === '/saved-movies' ? "movie_add_button_saved" : "movie_add_button"} onClick={onClickMovieDelete}
                    />)
                        : (<button className={ save  ? "movie_add_button_saved" : "movie_add_button"} onClick={onChangeSaveMovie}
                    />)
                }
            </article>
        </>
            
    );
}
