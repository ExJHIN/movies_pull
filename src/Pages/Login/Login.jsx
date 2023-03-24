import { useState } from 'react';
import { Link } from "react-router-dom";
import  "./Login.css";
import { useForm } from "react-hook-form";

export function Login({handleLogin}) {

const [isEmail, setEmail] = useState('');
const [isPassword, setPassword] = useState('');

function onChangeEmailHandler(event) {
    setEmail(event.target.value);
};

function onChangePasswordHandler(event) {
    setPassword(event.target.value);
};

const { register, formState : { errors, isValid},
  handleSubmit,
  reset,} = useForm(
    {
        mode: "onChange"
    }
);

const onChangeLoginHandler = () => {
    handleLogin(isEmail, isPassword);
    reset();
}
  return (
    <main className="main_container">
        <section className="register_section">
            <div className="register_global_container">
                <div className="header_link-logo register_logo">
                    <Link to="/">
                        <div className="header_logo"></div>
                    </Link>
                </div>
                <h1 className="register_title">Рады видеть!</h1>
                <form className="register_form" name={'login'} onSubmit={handleSubmit(onChangeLoginHandler)}>
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
                        <button className={`${isValid ? 'register_form_button login_button' : 'register_form_button login_button register_form_button_disabled'}`} disabled={!isValid} type="submit">Войти</button>
                        <p className="register_form_paragraph login_paragraph" >
                            Ещё не зарегистрированы?<Link className="register_form_link" to="/signup">Регистрация</Link>
                        </p>
                </form>
            </div>
        </section>
    </main>
  );
}

