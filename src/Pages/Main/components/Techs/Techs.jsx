import './Techs.css';

export function Techs() {

    return (
        <section className="techs_section">
            <div className="techs_global_container">
                <h3 className="techs_title">Технологии</h3>
                <span className="techs_subtitle">7 технологий</span>
                <p className="techs_subtitle_paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs_stack_list">
                    <li className="techs_list">HTML</li>
                    <li className="techs_list">CSS</li>
                    <li className="techs_list">JS</li>
                    <li className="techs_list">React</li>
                    <li className="techs_list">Git</li>
                    <li className="techs_list">Express.js</li>
                    <li className="techs_list">mongoDB</li>
                </ul>
            </div>
        </section>
    );
}
