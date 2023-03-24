import Selfie from '../../../../images/portfolio_photo.jpg';
import { Link } from "react-router-dom";
import './AboutMe.css';

export function AboutMe() {

    return (
        <section className="aboutme_section">
            <div className="aboutme_global_container">
                <h4 className="aboutme_title">Студент</h4>
                <div className="aboutme_content_container">
                    <div className="aboutme_text_container">
                        <span className="aboutme_title_name">Павел</span>
                        <p className="aboutme_paragraph_profession">Фронтенд-разработчик, 21 год</p>
                        <p className="aboutme_paragraph_history">
                            Я родился и живу в Рязани, заканчиваю факультет вычислительной техники РГРТУ.
                            Мне нравится слушать музыку, смотреть интересные сериалы, а также изучать новые технологии.
                            Два года назад я начал кодить, спустя время меня заинтересовала Front-end разработка и я начал ее изучать.
                            После того, как прошёл курс по веб-разработке, я устроился на работу Front-end разработчиком.
                        </p>
                        <a className="aboutme_paragraph_link" href="https://github.com/ExJHIN">Github</a>
                    </div>
                    <div className="photo_container">
                        <img src={Selfie} alt="Фото разработчика" className="aboutme_paragraph_photo"/>
                    </div>
                </div>
                <article className="aboutme_portfolio_container">
                    <span className="aboutrme_portfolio_title">Портфолио</span>
                    <div className="aboutme_portfolio_container-link">
                        <Link className="aboutme_portfolio_links" to="https://exjhin.github.io/How-to-learn.github.io/" target="_blank">Статичный сайт
                            <span className="aboutme_portfolio_icon">↗</span>
                        </Link>
                        <Link className="aboutme_portfolio_links about_portfolio_link_pad" to="https://exjhin.github.io/russian-travel/" target="_blank">Адаптивный сайт
                            <span className="aboutme_portfolio_icon">↗</span>
                        </Link>
                        <Link className="aboutme_portfolio_links-last about_portfolio_link_pad" to="https://social-network.mesto.nomoredomains.work" target="_blank">Одностраничное приложение
                            <span className="aboutme_portfolio_icon">↗</span>
                        </Link>
                    </div>
                </article>
            </div>
        </section>
    );
}
