import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../images/icon_profile.svg';
import  "./HeaderAuthorized.css";


export function HeaderAuthorized() {

  const [isActive, setIsActive] = useState(false);
  const onClickHandler = () => {
    setIsActive(prev => !prev);
  }
 
  return (
    <header
      className="header_auth"
    >
      <div className="header_container container">
        <div className="header_link-logo">
          <Link to="/">
            <div className="header_logo"></div>
          </Link>
        </div>
        <nav className="header_auth_navigation">
            <div className="header_auth_navbar">
                <NavLink 
                  className={({isActive}) => `${isActive ? "header__auth_navlink header__auth_navlink_active" : "header__auth_navlink"}`}
                  to="/movies"
                >
                  Фильмы
                </NavLink>
                <NavLink 
                  className={({isActive}) => `${isActive ? "header__auth_navlink header__auth_navlink_active" : "header__auth_navlink"}`}
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
            </div>
            <Link className="header__auth_button" to="/profile">
                Аккаунт
                <img src={logo} alt="Icon profile" className="header_auth_icon"/>
            </Link>
        </nav>
        <div id="menuToggle" className="header_togle_menu menuToggle">

          <input type="checkbox" onClick={onClickHandler}/>
          <div 
            className={`blur ${isActive ? 'blur_active' : '' }`}
          />

          <span className="header_auth_mobile-bord"></span>
          <span className="header_auth_mobile-bord"></span>
          <span className="header_auth_mobile-bord"></span>

          <ul id="menu">
            <Link to="/" className="header_auth_mobile-bord"><li>Главная</li></Link>
            <Link to="/movies" className="header_auth_mobile-bord"><li>Фильмы</li></Link>
            <Link to="/saved-movies" className="header_auth_mobile-bord"><li>Сохранённые&nbsp;фильмы</li></Link>
            <Link className="header__auth_button header__auth_button-burger" to="/profile">
                Аккаунт
                <img src={logo} alt="Icon profile" className="header_auth_icon"/>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

