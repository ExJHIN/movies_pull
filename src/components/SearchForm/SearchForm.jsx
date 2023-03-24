import {useState,useContext, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FilterCheckBox } from './components/FilterCheckbox/index';
import './SearchForm.css';

export function SearchForm({ onChangeGetMoviesHandler, onChangeGetMoviesOnCheckboxActive }) {

const { register, formState : 
    {errors},
    handleSubmit,
    reset,} = useForm({
    mode: "onSubmit"
    }
);

const currentUser = useContext(CurrentUserContext);
const [isInputValue,setIsInputValue] = useState('');
const [checkbox, setCheckbox] = useState(false);

function onClickSearchHandler(e) {
    e.preventDefault();
    onChangeGetMoviesHandler(isInputValue);
    setCheckbox(false);
    reset();
}


function handleTumblerChange(evt) {
    const stateCheckbox = !checkbox;
    setCheckbox(stateCheckbox);
    onChangeGetMoviesOnCheckboxActive(stateCheckbox);
}

function onChangeSearchMoviesHandler (event) {
    setIsInputValue(event.target.value);
}

  useEffect(() => {
    setIsInputValue(isInputValue);
  }, [isInputValue]);

    return (
        <section className="searchform_section">
            <div className="promo_global_container-content">
                <form className="searchform_section_container" name="search" noValidate onSubmit={handleSubmit(onClickSearchHandler)}>
                    <input className="searchform_section_input" type="text" placeholder="Фильм" required value={isInputValue || ""}
                        {...register    
                            ('searchForm', 
                                {
                                    required: 'Введите ключевое слово для поиска',
                                    minLength: {
                                        value: 1,
                                        message: 'Необходимо ввести ключевое слово'
                                    },
                                    onChange: (e) => onChangeSearchMoviesHandler(e),
                                }
                            )
                        }
                     />
                    <button className="searchform_section_button" onClick={onClickSearchHandler} type="submit">Найти</button>
                </form>
                {errors?.searchForm && 
                        <span className="register_form_input-error">
                            {errors?.searchForm?.message || "Что-то пошло не так..."}
                        </span>
                }
                <FilterCheckBox handleTumblerChange={handleTumblerChange} checkbox={checkbox} />
            </div>
        </section>
    );
}
