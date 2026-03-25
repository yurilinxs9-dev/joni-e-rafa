import './OurStory.css'

export default function OurStory() {
  return (
    <section id="nossa-historia" className="nh-section" aria-label="Nossa história">
      <div className="nh-wrap">
        <figure className="nh-photo">
          <div className="nh-frame">
            <img
              src="/assets/images/nossa-historia.jpeg"
              alt="Joni e Rafa sorrindo frente a frente"
              loading="lazy"
            />
          </div>
        </figure>

        <div className="nh-content">
          <div className="nh-title-wrap">
            <span className="nh-script">Nossa História</span>
            <h2 className="nh-title">NOSSA HISTÓRIA</h2>
          </div>

          <div className="nh-divider" aria-hidden="true"></div>

          <div className="nh-text">
            <p>
              Nosso amor começou como uma amizade sincera que floresceu em algo mágico.
              Cada momento compartilhado, cada risada trocada, cada desafio superado juntos
              nos trouxe até aqui — ao dia mais especial de nossas vidas.
            </p>
            <p>
              Hoje, cercados pelo amor de família e amigos, daremos o próximo passo desta
              jornada maravilhosa. Estamos ansiosos para celebrar este momento inesquecível
              com todos vocês, que fazem parte da nossa história.
            </p>
            <p className="nh-quote">
              "O amor não consiste em olhar um para o outro, mas sim em olhar juntos
              para a mesma direção."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
