import {useState, useContext, useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";
import { HeaderAuthorized } from '../../ui/HeaderAuthorized/index';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import  "./Profile.css";


export function Profile({exit, getUsetInfoProfile}) {
  const currentUser = useContext(CurrentUserContext);

  const [isEmail, setEmail] = useState(currentUser.email);
  const [isName, setName] = useState(currentUser.name);
  const [isActiveSave, setActiveSave]= useState(false);

  const profileName = useRef(currentUser.name);
  const profileEmail = useRef(currentUser.email);

  const editingButtonActive = () => {
    setActiveSave(prev => !prev);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState : { errors, isValid},
    reset,
  } = useForm
  (
    {
    mode: "onChange",
    defaultValues: {
			name: currentUser.name,
			email: currentUser.email,
		  },
    }
  );
  
  function onChangeNameHandler(event) {
		setName(event.target.value);
    setValue('name', event.target.value);
	};

	function onChangeEmailHandler(event) {
		setEmail(event.target.value);
    setValue('email', event.target.value);
	};

  function getUsetInfoHandler() {
		getUsetInfoProfile(isName, isEmail);
    reset();
	}

  profileName.current = currentUser.name;
  profileEmail.current = currentUser.email;

	useEffect(() => {
		setName(currentUser.name);
    setValue('name', currentUser.name);
		setEmail(currentUser.email);
    setValue('email', currentUser.email)
	}, [currentUser, setValue]);
  
  return (
    <>
      <HeaderAuthorized />
      <main className="main_container">
          <section className="profile_section">
            <div className="profile_global_container">
              <h1 className="profile_title">Привет, {isName}!</h1>
              <form className="profile_form" noValidate onSubmit={handleSubmit(getUsetInfoHandler)}>
                {errors?.ValidateProfileName && 
                  <span className="register_form_input-error">
                    {errors?.ValidateProfileName?.message || "Что-то пошло не так..."}
                  </span>
                }
                <fieldset className="profile_form_container">
                  <label className="profile_form_label">Имя</label>
                  <input className="profile_form_input" type="text" required  placeholder={isName || ""} value={isName || ""}
                    {...register
                      (
                        "ValidateProfileName",
                          {
                            required: "Обязательное поле для заполнения",
                            minLength: {
                              value: 2,
                              message: 'Должно быть минимум не менее двух символов'
                            },
                            maxLength: {
                              value: 30,
                              message: 'Должно быть не более 30 символов'
                            },
                            pattern: {
                              value: /^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ[\]h-]+$/umi,
                              message: 'Разрешено использовать только латиницу и кириллицу'
                            },
                            onChange: (e) => onChangeNameHandler(e),
                        }
                      )
                    }         
                    />
                </fieldset>
                <fieldset className="profile_form_container">
                  <label className="profile_form_label">E-mail</label>
                  <input className="profile_form_input" type="email" required placeholder={isEmail || ""} value={isEmail || ""} 
                    {...register
                      (
                          "ValidateProfileEmail",
                          {   
                              required: "Обязательное поле для заполнения",
                              minLength: {
                              value: 2,
                              message: 'E-mail должен быть минимум не менее двух символов'
                              },
                              maxLength: {
                              value: 30,
                              message: 'E-mail должен быть не длиннее 30 символов'
                              },
                              pattern: {
                              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                              message: 'Введите ваш E-mail'
                              },
                              onChange: (e) => onChangeEmailHandler(e),
                          }
                      )
                  }
                  />
                </fieldset>
                {errors?.ValidateProfileEmail && 
                  <span className="register_form_input-error">
                    {errors?.ValidateProfileEmail?.message || "Что-то пошло не так..."}
                  </span>
                }
                {!isActiveSave ? (
                  <button className="profile_edit" type="submit"  onClick={editingButtonActive}>Редактировать</button>
                ):(
                  <button className={`${ isValid ? 'register_form_button profile_button' : 'register_form_button profile_button profile_edit_button_disabled'}`}  disabled={!isValid} onClick={editingButtonActive} type="submit">Сохранить</button>
                )
              }
              </form>
              <div className="profile_edit_container">
                <button className="profile_edit_button" type="button" onClick={exit}>Выйти из аккаунта</button>
              </div>
            </div>
          </section>
      </main>
    </>
  );
}

