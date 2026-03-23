import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Matches() {
  const { isAdmin } = useAuth()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRound, setSelectedRound] = useState('1')
  const [editingMatch, setEditingMatch] = useState(null)
  const [tempScores, setTempScores] = useState({ home: 0, away: 0 })

  useEffect(() => {
    fetchMatches()
  }, [])

  async function fetchMatches() {
    setLoading(true)
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (error) {
      console.error('Error fetching matches:', error)
    } else {
      // Map database fields to UI fields if necessary
      const mappedMatches = data.map(m => ({
        ...m,
        round: m.round.toString(),
        home: m.home_team,
        away: m.away_team
      }))
      setMatches(mappedMatches)
    }
    setLoading(false)
  }

  const rounds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
  const roundMatches = matches.filter(m => m.round === selectedRound)

  const startEdit = (match) => {
    setEditingMatch(match.id)
    setTempScores({
      home: match.home_score ?? 0,
      away: match.away_score ?? 0
    })
  }

  const saveScore = async (matchId) => {
    const { error } = await supabase
      .from('matches')
      .update({
        home_score: tempScores.home,
        away_score: tempScores.away,
        status: 'finished',
        updated_at: new Date().toISOString()
      })
      .eq('id', matchId)

    if (error) {
      console.error('Error saving score:', error)
      alert('Erro ao salvar o placar. Tente novamente.')
    } else {
      setEditingMatch(null)
      fetchMatches() // Refresh data
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase()
  }

  if (loading && matches.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-text-secondary font-bebas text-2xl tracking-widest">CARREGANDO JOGOS...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-bebas text-5xl text-white tracking-wider mb-2">
          JOGOS DO <span className="text-accent">CAMPEONATO</span>
        </h1>
        <p className="text-text-secondary font-medium">
          {isAdmin ? 'Painel de Administração: Edite os placares dos jogos abaixo.' : 'Acompanhe em tempo real todos os resultados das rodadas.'}
        </p>
      </div>

      {/* Round Selector */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {rounds.map(round => {
          const hasMatches = matches.some(m => m.round === round)

          return (
            <button
              key={round}
              onClick={() => setSelectedRound(round)}
              className={`px-8 py-4 rounded-xl font-bebas text-2xl transition-all duration-300 whitespace-nowrap border-b-4 ${
                selectedRound === round
                  ? 'bg-accent text-primary border-accent shadow-lg shadow-accent/20 translate-y-[-2px]'
                  : 'bg-surface text-text-secondary border-transparent hover:bg-slate-700 hover:text-white'
              }`}
            >
              {round === '15' ? 'SEMIFINAL' : round === '16' ? 'FINAL' : `RODADA ${round}`}
            </button>
          )
        })}
      </div>

      {/* Matches Grid */}
      {roundMatches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roundMatches.map(match => (
            <div
              key={match.id}
              className="glass-card rounded-2xl overflow-hidden group hover:border-accent/30 transition-all duration-300"
            >
              {/* Match Header */}
              <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${match.home_score !== null ? 'bg-success' : 'bg-accent animate-pulse'}`} />
                  <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                    {formatDate(match.date)} • {match.time}
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-primary text-accent px-3 py-1 rounded-full uppercase tracking-tighter border border-accent/20">
                  Campo {match.field}
                </span>
              </div>

              {/* Teams & Score */}
              <div className="p-8">
                <div className="flex items-center justify-between gap-4">
                  {/* Home Team */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-20 h-20 bg-primary/50 rounded-2xl mb-4 flex items-center justify-center border border-white/5 group-hover:border-accent/20 transition-colors shadow-inner">
                      <span className="font-bebas text-3xl text-accent">
                        {match.home?.substring(0, 2) || '??'}
                      </span>
                    </div>
                      <p className="font-sans font-extrabold text-white text-xs text-center line-clamp-2 h-10 uppercase tracking-wide">
                      {match.home}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center justify-center min-w-[100px]">
                    {editingMatch === match.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={tempScores.home}
                          onChange={(e) => setTempScores(prev => ({ ...prev, home: parseInt(e.target.value) || 0 }))}
                          className="w-12 h-16 text-center bg-primary border-2 border-accent rounded-xl text-white font-bebas text-4xl shadow-lg focus:outline-none"
                        />
                        <span className="text-accent font-bebas text-2xl">X</span>
                        <input
                          type="number"
                          min="0"
                          value={tempScores.away}
                          onChange={(e) => setTempScores(prev => ({ ...prev, away: parseInt(e.target.value) || 0 }))}
                          className="w-12 h-16 text-center bg-primary border-2 border-accent rounded-xl text-white font-bebas text-4xl shadow-lg focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className={`font-bebas text-6xl tracking-tighter ${match.home_score !== null ? 'text-white' : 'text-slate-700'}`}>
                          {match.home_score !== null ? (
                            <div className="flex items-center gap-3">
                              <span>{match.home_score}</span>
                              <span className="text-accent text-3xl">:</span>
                              <span>{match.away_score}</span>
                            </div>
                          ) : (
                            <span className="text-3xl uppercase tracking-widest text-slate-700">VS</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-20 h-20 bg-primary/50 rounded-2xl mb-4 flex items-center justify-center border border-white/5 group-hover:border-accent/20 transition-colors shadow-inner">
                      <span className="font-bebas text-3xl text-accent">
                        {match.away?.substring(0, 2) || '??'}
                      </span>
                    </div>
                      <p className="font-sans font-extrabold text-white text-xs text-center line-clamp-2 h-10 uppercase tracking-wide">
                      {match.away}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                {isAdmin && (
                  <div className="mt-8 pt-6 border-t border-white/5">
                    {editingMatch === match.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveScore(match.id)}
                          className="flex-1 py-3 bg-success hover:bg-success/80 text-primary font-bold rounded-xl transition-all shadow-lg"
                        >
                          SALVAR
                        </button>
                        <button
                          onClick={() => setEditingMatch(null)}
                          className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                        >
                          CANCELAR
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(match)}
                        className="w-full py-3 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl transition-all shadow-lg shadow-accent/20 uppercase tracking-wider text-sm"
                      >
                        {match.home_score !== null ? 'Editar Placar' : 'Informar Placar'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-20 text-center border-dashed border-2 border-white/10">
          <p className="text-text-secondary font-bebas text-3xl tracking-widest opacity-50">Nenhum jogo agendado para esta rodada.</p>
        </div>
      )}
    </div>
  )
}
