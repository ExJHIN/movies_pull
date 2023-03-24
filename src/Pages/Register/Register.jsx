import { Link } from "react-router-dom";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import  "./Register.css";

export function Register({handleRegister}) {

const [isName, setName] = useState('');
const [isEmail, setEmail] = useState('');
const [isPassword, setPassword] = useState('');

function onChangeNameHandler(event) {
    setName(event.target.value);
};

const { register, formState : { errors, isValid},
    handleSubmit,
    reset,} = useForm({
    mode: "onChange"
    }
);

const onChangeRegisterHandler = () => {
    handleRegister(isName, isEmail, isPassword);
    reset();
};

function onChangeEmailHandler(event) {
    setEmail(event.target.value);
};

function onChangePasswordHandler(event) {
    setPassword(event.target.value);
};

  return (
    <main className="main_container">
        <section className="register_section">
            <div className="register_global_container">
                <div className="header_link-logo register_logo">
                    <Link to="/">
                        <div className="header_logo"></div>
                    </Link>
                </div>
                <h1 className="register_title">Добро пожаловать!</h1>
                <form className="register_form" name={'register'} onSubmit={handleSubmit(onChangeRegisterHandler)}>
                        <label className="register_form_label">Имя</label>
                        <input className="register_form_input" type="text" required placeholder="Имя" value={isName || ""}
                            {...register
                                (
                                    "ValidateRegistationName",
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
                        {errors?.ValidateRegistationName && 
                            <span className="register_form_input-error">
                                {errors?.ValidateRegistationName?.message || "Что-то пошло не так..."}
                            </span>
                        }
                        <label className="register_form_label">E-mail</label>
                        <input className="register_form_input" type="email" required placeholder="E-mail" value={isEmail || ""}
                             {...register
                                (
                                    "ValidateRegistationEmail",
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
                        {errors?.ValidateRegistationEmail && 
                            <span className="register_form_input-error">
                                {errors?.ValidateRegistationEmail?.message || "Что-то пошло не так..."}
                            </span>
                        }
                        <label className="register_form_label">Пароль</label>
                        <input className="register_form_input password_color" type="password" required placeholder="password" value={isPassword || ""}
                            {...register
                                (
                                    "ValidateRegistationPassword",
                                    {
                                        required: "Обязательное поле для заполнения",
                                        minLength: {
                                        value: 8,
                                        message: 'Пароль должен быть не короче 8 символов'
                                        },
                                        maxLength: {
                                        value: 30,
                                        message: 'Пароль должен быть не длиннее 30 символов'
                                        },
                                        onChange: (e) => onChangePasswordHandler(e),
                                    }
                                )
                            }
                        />
                        {errors?.ValidateRegistationPassword && 
                            <span className="register_form_input-error">
                                {errors?.ValidateRegistationPassword?.message || "Что-то пошло не так..."}
                            </span>
                        }
                        <button className={`${isValid ? 'register_form_button' : 'register_form_button register_form_button_disabled'}`} disabled={!isValid} type="submit">Зарегистрироваться</button>
                        <p className="register_form_paragraph">
                            Уже зарегистрированы?<Link className="register_form_link" to="/signin">Войти</Link>
                        </p>
                </form>
            </div>
        </section>
    </main>
  );
}

