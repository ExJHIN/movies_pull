import { useNavigate, Link } from "react-router-dom";
import  "./NotFound.css";

export function NotFound() {
const history = useNavigate();

  return (
    <main className="main_container">
        <section className="notfound_section">
            <div className="notfound_global_container">
                <h1 className="notfound_title">404</h1>
                <span className="notfound_error_text">Страница не найдена</span>
            </div>
            <Link className="notfound_button_esc history-back"  onClick={() => history(-1)}>Назад</Link>
        </section>
    </main>
  );
}

