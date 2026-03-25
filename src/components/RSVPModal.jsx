import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import './RSVPModal.css'

export default function RSVPModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ nome: '', telefone: '', confirma: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  function handleOverlayClick(e) {
    if (e.target === modalRef.current) onClose()
  }

  function formatPhone(value) {
    let v = value.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/, '($1) $2')
      v = v.replace(/(\d{4})(\d)/, '$1-$2')
    } else {
      v = v.replace(/(\d{2})(\d)/, '($1) $2')
      v = v.replace(/(\d{5})(\d)/, '$1-$2')
    }
    return v
  }

  function handlePhoneChange(e) {
    setFormData(prev => ({ ...prev, telefone: formatPhone(e.target.value) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase.from('rsvps').insert({
        nome: formData.nome,
        telefone: formData.telefone,
        confirma_presenca: formData.confirma
      })

      if (error) throw error

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ nome: '', telefone: '', confirma: '' })
        onClose()
      }, 2500)
    } catch {
      alert('Erro ao enviar. Tente novamente!')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="cp-modal-overlay is-open"
      ref={modalRef}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div className="cp-modal-content" role="dialog" aria-modal="true" aria-labelledby="cp-modal-title">
        <button type="button" className="cp-modal-close" onClick={onClose} aria-label="Fechar modal">
          &times;
        </button>

        <h3 className="cp-modal-title" id="cp-modal-title">
          NÃO SE ESQUEÇAM:<br />TRAJE PASSEIO COMPLETO!
        </h3>

        {submitted ? (
          <div className="cp-success-message">
            <span className="cp-success-icon">✓</span>
            <p>Confirmação enviada com sucesso!</p>
          </div>
        ) : (
          <form className="cp-form" onSubmit={handleSubmit}>
            <div className="cp-input-group">
              <label htmlFor="cp-nome">Nome Completo</label>
              <input
                type="text"
                id="cp-nome"
                placeholder="Digite seu nome"
                required
                value={formData.nome}
                onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              />
            </div>

            <div className="cp-input-group">
              <label htmlFor="cp-telefone">Telefone / WhatsApp</label>
              <input
                type="tel"
                id="cp-telefone"
                placeholder="(00) 00000-0000"
                required
                value={formData.telefone}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="cp-input-group cp-radio-group">
              <span className="cp-radio-title">Confirmar Presença:</span>

              <label className="cp-radio-label" htmlFor="confirmar-sim">
                <input
                  type="radio"
                  id="confirmar-sim"
                  name="confirma"
                  value="Sim"
                  required
                  checked={formData.confirma === 'Sim'}
                  onChange={e => setFormData(prev => ({ ...prev, confirma: e.target.value }))}
                />
                Sim
              </label>

              <label className="cp-radio-label" htmlFor="confirmar-nao">
                <input
                  type="radio"
                  id="confirmar-nao"
                  name="confirma"
                  value="Não"
                  required
                  checked={formData.confirma === 'Não'}
                  onChange={e => setFormData(prev => ({ ...prev, confirma: e.target.value }))}
                />
                Não
              </label>
            </div>

            <button type="submit" className="cp-button cp-button--submit" disabled={submitting}>
              <span className="cp-button__text">
                {submitting ? 'ENVIANDO...' : 'ENVIAR CONFIRMAÇÃO'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
