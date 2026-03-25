import './Footer.css'

export default function Footer() {
  return (
    <footer id="rodape-casamento" className="rf-section" aria-label="Rodapé do site">
      <div className="rf-wrap">
        <span className="rf-heart" aria-hidden="true">
          <svg className="rf-heart-svg" viewBox="0 0 24 24" width="26" height="26" role="img">
            <defs>
              <linearGradient id="rf-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f2e49b" />
                <stop offset="55%" stopColor="#d6b559" />
                <stop offset="100%" stopColor="#b88a2d" />
              </linearGradient>
            </defs>
            <path
              fill="url(#rf-gold)"
              d="M12 21s-6.716-4.29-9.428-7.002C.965 12.39 1.02 9.43 2.89 7.56a5.002 5.002 0 0 1 7.071 0L12 9.6l2.04-2.04a5.002 5.002 0 0 1 7.071 0c1.871 1.87 1.926 4.83.318 6.438C18.716 16.71 12 21 12 21z"
            />
          </svg>
        </span>

        <p className="rf-names">Rafaella &amp; Johnatan</p>
        <p className="rf-date">18 de abril de 2026</p>
        <p className="rf-note">Feito com muito amor para o nosso dia especial.</p>
      </div>
    </footer>
  )
}
