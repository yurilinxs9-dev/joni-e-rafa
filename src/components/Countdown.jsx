import { useState, useEffect } from 'react'
import './Countdown.css'

const TARGET_ISO = "2026-04-18T16:00:00-03:00"

function pad(n) {
  return String(n).padStart(2, '0')
}

function countSundays(now, end) {
  if (end <= now) return 0

  const start = new Date(now)
  start.setHours(0, 0, 0, 0)

  const day = start.getDay()
  const nextSunday = new Date(start)
  const delta = day === 0 ? 0 : 7 - day
  nextSunday.setDate(nextSunday.getDate() + delta)

  const endInclusive = new Date(end)
  endInclusive.setHours(23, 59, 59, 999)

  let c = 0
  for (let d = nextSunday; d <= endInclusive; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)) {
    c++
  }
  return c
}

export default function Countdown() {
  const [time, setTime] = useState({ sundays: 0, hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const endDate = new Date(TARGET_ISO)

    function tick() {
      const now = new Date()
      const diff = Math.max(0, endDate.getTime() - now.getTime())

      const sundays = countSundays(now, endDate)
      const s = Math.floor(diff / 1000)
      const hours = pad(Math.floor((s % 86400) / 3600))
      const minutes = pad(Math.floor((s % 3600) / 60))
      const seconds = pad(s % 60)

      setTime({ sundays, hours, minutes, seconds })
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const cards = [
    { value: time.sundays, label: 'DOMINGOS' },
    { value: time.hours, label: 'HORAS' },
    { value: time.minutes, label: 'MINUTOS' },
    { value: time.seconds, label: 'SEGUNDOS' },
  ]

  return (
    <section id="contagem-regressiva" className="cr-section" aria-label="Contagem regressiva">
      <div className="cr-wrap">
        <div className="cr-title-wrap">
          <span className="cr-script" aria-hidden="true">Contagem Regressiva</span>
          <h2 className="cr-title">CONTAGEM REGRESSIVA</h2>
          <p className="cr-sub">QUANTOS DOMINGOS FALTAM?</p>
        </div>

        <div className="cr-cards" role="group" aria-label="Tempo restante">
          {cards.map(card => (
            <div className="cr-card" key={card.label}>
              <div className="cr-value">{card.value}</div>
              <div className="cr-label">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
