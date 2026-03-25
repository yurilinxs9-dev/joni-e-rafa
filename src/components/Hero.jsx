import { useState } from 'react'
import RSVPModal from './RSVPModal'
import './Hero.css'

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="hero-section">
      <div className="cp-wrap">
        <div className="cp-title-wrap">
          <h2 id="cp-title" className="cp-title">
            CONFIRME SUA PRESENÇA NESSA DATA TÃO ESPECIAL
          </h2>
        </div>

        <div className="cp-cta">
          <a
            href="https://jonirafa.lojavirtualnuvem.com.br/"
            className="cp-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acessar lista de presentes"
          >
            <span className="cp-button__text">Lista de Presentes</span>
          </a>

          <button
            type="button"
            className="cp-button"
            onClick={() => setModalOpen(true)}
            aria-label="Confirmar presença"
          >
            <span className="cp-button__text">Confirme sua presença</span>
          </button>
        </div>
      </div>

      <RSVPModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
