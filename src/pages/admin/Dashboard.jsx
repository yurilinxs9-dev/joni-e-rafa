import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './Admin.css'

export default function Dashboard() {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    fetchRsvps()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) navigate('/admin/login')
  }

  async function fetchRsvps() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRsvps(data || [])
    } catch {
      console.error('Erro ao carregar confirmações')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir esta confirmação?')) return
    const { error } = await supabase.from('rsvps').delete().eq('id', id)
    if (!error) setRsvps(prev => prev.filter(r => r.id !== id))
  }

  const filtered = rsvps.filter(r => {
    const matchSearch = r.nome.toLowerCase().includes(search.toLowerCase()) ||
      r.telefone.includes(search)
    const matchFilter = filter === 'todos' ||
      (filter === 'sim' && r.confirma_presenca === 'Sim') ||
      (filter === 'nao' && r.confirma_presenca === 'Não')
    return matchSearch && matchFilter
  })

  const totalSim = rsvps.filter(r => r.confirma_presenca === 'Sim').length
  const totalNao = rsvps.filter(r => r.confirma_presenca === 'Não').length

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  function exportCSV() {
    const header = 'Nome,Telefone,Presença,Data\n'
    const rows = filtered.map(r =>
      `"${r.nome}","${r.telefone}","${r.confirma_presenca}","${formatDate(r.created_at)}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'confirmacoes-casamento.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-title">R&J</h2>
          <p className="admin-sidebar-sub">Painel Admin</p>
        </div>

        <nav className="admin-nav">
          <a href="#" className="admin-nav-item admin-nav-item--active">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Confirmações
          </a>
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-page-title">Confirmações de Presença</h1>
            <p className="admin-page-sub">Gerencie as confirmações do casamento</p>
          </div>
          <button className="admin-btn admin-btn--gold" onClick={exportCSV}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar CSV
          </button>
        </header>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon--total">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="admin-stat-value">{rsvps.length}</p>
              <p className="admin-stat-label">Total de Respostas</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon--yes">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="admin-stat-value">{totalSim}</p>
              <p className="admin-stat-label">Confirmados</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon--no">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div>
              <p className="admin-stat-value">{totalNao}</p>
              <p className="admin-stat-label">Não Vão</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-search">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-filter-btns">
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'sim', label: 'Confirmados' },
              { key: 'nao', label: 'Não vão' },
            ].map(f => (
              <button
                key={f.key}
                className={`admin-filter-btn ${filter === f.key ? 'admin-filter-btn--active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner"></div>
              <p>Carregando confirmações...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <p>Nenhuma confirmação encontrada</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Presença</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(rsvp => (
                  <tr key={rsvp.id}>
                    <td>
                      <div className="admin-user-cell">
                        <div className="admin-avatar">
                          {rsvp.nome.charAt(0).toUpperCase()}
                        </div>
                        <span>{rsvp.nome}</span>
                      </div>
                    </td>
                    <td>{rsvp.telefone}</td>
                    <td>
                      <span className={`admin-badge ${rsvp.confirma_presenca === 'Sim' ? 'admin-badge--yes' : 'admin-badge--no'}`}>
                        {rsvp.confirma_presenca === 'Sim' ? 'Confirmado' : 'Não vai'}
                      </span>
                    </td>
                    <td className="admin-date-cell">{formatDate(rsvp.created_at)}</td>
                    <td>
                      <button
                        className="admin-btn-icon admin-btn-icon--danger"
                        onClick={() => handleDelete(rsvp.id)}
                        title="Excluir"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
