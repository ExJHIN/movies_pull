import './AboutProject.css';

export function AboutProject() {

    return (
        <section className="about_project-section">
            <h2 className="about_project-title">О проекте</h2>
            <div className="about_project-main">
                <div>
                    <span className="about_project-span">Дипломный проект включал 5 этапов</span>
                    <p className="about_project-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <span className="about_project-span">На выполнение диплома ушло 5 недель</span>
                    <p className="about_project-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about_project_container">
                <div className="about_project-back">
                    <span className="about_project-back_week">1 неделя</span>
                    <span className="about_project_bottom-info">Back-end</span>
                </div>
                <div className="about_project-front">
                    <span className="about_project-front_week">4 недели</span>
                    <span className="about_project_bottom-info">Front-end</span>
                </div>
            </div>
        </section>
    );
}
