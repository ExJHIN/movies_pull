import { Link } from "react-router-dom";
import  "./Header.css";

export function Header() {
  return (
    <header
      className="header"
    >
      <div className="header_container container">
        <div className="header_link-logo">
            <div className="header_logo" href="/"></div>
        </div>
        <nav className="header_navigation">
            <Link className="header_films-link header_custom-link" to="/signup">Регистрация</Link>
            <Link className="header_films-link_button" to="/signin">Войти</Link>
        </nav>
      </div>
    </header>
  );
}

