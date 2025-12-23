import './contato.css';

export default function Contato() {
    return (
        <div className="container contato-container">
            <section className="contato-hero">
                <div>
                    <span className="contato-kicker">Vamos conversar</span>
                    <h1>Contato</h1>
                    <p className="contato-subtitle">
                        Conexoes diretas para falar comigo ou acompanhar meus projetos.
                    </p>
                </div>
                <div className="contato-card destaque">
                    <h2>Email</h2>
                    <p>rodrigoborgesmachado@gmail.com</p>
                    <a
                        className="contato-link"
                        href="mailto:rodrigoborgesmachado@gmail.com"
                    >
                        Enviar email
                    </a>
                </div>
            </section>

            <section className="contato-grid">
                <div className="contato-card">
                    <h2>GitHub</h2>
                    <p>github.com/rodrigoborgesmachado</p>
                    <a
                        className="contato-link"
                        href="https://github.com/rodrigoborgesmachado"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ver projetos
                    </a>
                </div>
                <div className="contato-card">
                    <h2>Portfolio</h2>
                    <p>rodrigomachado.net</p>
                    <a
                        className="contato-link"
                        href="https://www.rodrigomachado.net/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ver portfolio
                    </a>
                </div>
                <div className="contato-card">
                    <h2>LinkedIn</h2>
                    <p>linkedin.com/in/rodrigoborgesmachado</p>
                    <a
                        className="contato-link"
                        href="https://www.linkedin.com/in/rodrigoborgesmachado/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Conectar
                    </a>
                </div>
            </section>
        </div>
    );
}
