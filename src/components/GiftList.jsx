import './GiftList.css'

export default function GiftList() {
  return (
    <section id="lista-presentes" className="lp-section" aria-labelledby="lp-title">
      <div className="lp-wrap">
        <div className="lp-title-wrap">
          <span className="lp-script" aria-hidden="true">Lista de Presente</span>
          <h2 id="lp-title" className="lp-title">LISTA DE PRESENTE</h2>
        </div>

        <div className="lp-divider" aria-hidden="true"></div>

        <div className="lp-text">
          <p>
            Sua presença é o nosso maior presente, mas se desejar nos presentear,
            preparamos uma lista especial com carinho.
          </p>
          <p>
            Acesse nossa lista de presentes e escolha o que desejar nos presentear.
          </p>
        </div>

        <div className="lp-cta">
          <a
            href="https://jonirafa.lojavirtualnuvem.com.br/"
            className="lp-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir lista de presentes"
          >
            <span className="lp-button__text">Acessar lista de presentes</span>
          </a>
        </div>
      </div>
    </section>
  )
}
