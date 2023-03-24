import { Link } from "react-router-dom";
import  "./Footer.css";

export function Footer() {

  return (
    <footer className="footer">
        <div className="footer_container">
            <p className="footer_main_tag">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer_container_links">
                <div>© 2023</div>
                <div className="footer_container_left">
                    <Link className="footer_link" to="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
                    <Link className="footer_link" to="https://github.com/ExJHIN" target="_blank">Github</Link>
                </div>
            </div>
        </div>
    </footer>
  );
}

