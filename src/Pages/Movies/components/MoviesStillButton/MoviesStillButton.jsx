import './MoviesStillButton.css';

export function MoviesStillButton({onChangeShowMoreHandler}) {

    return (
        <button className="moviescardlist_button_add" type="button" onClick={onChangeShowMoreHandler}>Ещё</button>
    );
}
