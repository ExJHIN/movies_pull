import logo from '../../../../images/text__COLOR_landing-logo.svg';
import './Promo.css';

export function Promo() {

    return (
        <section className="promo_section">
            <div className="promo_global_container-content">
                <div className="promo_global_container">
                    <div className="promo_text_container">
                        <h1 className="promo_text_main">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                        <p className="promo_text_paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    </div>
                    <div className="promo_icon_container">
                        <img src={logo} className="promo_logo"  alt="web icon"/>
                    </div>
                </div>
                <button className="promo_button">Узнать больше</button>
            </div>
        </section>
    );
}
