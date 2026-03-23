import { useState, useEffect, useMemo } from 'react'
import { recalcularClassificacao } from '../utils/recalcularClassificacao'
import { supabase } from '../lib/supabase'

function StandingsTable({ title, teams }) {
  const getPositionStyle = (team) => {
    if (team.taca === 'Ouro') return 'bg-amber-500/20 text-amber-500 border-amber-500/60 shadow-sm shadow-amber-500/20'
    return 'bg-slate-400/20 text-slate-300 border-slate-400/50 shadow-sm shadow-slate-400/10'
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
        <h2 className="font-bebas text-3xl text-white tracking-widest">{title}</h2>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary/30 text-accent/70 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-white/5">
              <th className="px-6 py-4 text-left w-20">Pos</th>
              <th className="px-6 py-4 text-left">Equipe</th>
              <th className="px-4 py-4 text-center w-14">P</th>
              <th className="px-4 py-4 text-center w-14">J</th>
              <th className="px-4 py-4 text-center w-14">V</th>
              <th className="px-4 py-4 text-center w-14">GP</th>
              <th className="px-4 py-4 text-center w-14">GC</th>
              <th className="px-4 py-4 text-center w-14">SG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {teams.map((team) => (
              <tr key={team.name} className="hover:bg-white/[0.02] transition-colors group/row">
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bebas text-xl border transition-all group-hover/row:scale-110 ${getPositionStyle(team)}`}>
                    {team.position}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/50 border border-white/5 rounded-xl flex items-center justify-center shadow-inner">
                      <span className="font-bebas text-xl text-accent">
                        {team.name.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans font-extrabold text-white uppercase tracking-wide text-xs block">{team.name}</span>
                      {team.taca === 'Ouro' && (
                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest opacity-90">Taça de Ouro</span>
                      )}
                      {team.taca === 'Prata' && (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-90">Taça de Prata</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="font-bebas text-3xl text-accent">{team.points}</span>
                </td>
                <td className="px-4 py-5 text-center text-text-primary/70 font-medium">{team.played}</td>
                <td className="px-4 py-5 text-center text-success font-bold">{team.wins}</td>
                <td className="px-4 py-5 text-center text-text-secondary">{team.goalsFor}</td>
                <td className="px-4 py-5 text-center text-text-secondary">{team.goalsAgainst}</td>
                <td className={`px-4 py-5 text-center font-bebas text-xl ${team.goalDiff > 0 ? 'text-success' : team.goalDiff < 0 ? 'text-error' : 'text-text-secondary'}`}>
                  {team.goalDiff > 0 ? '+' : ''}{team.goalDiff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Standings() {
  const [data, setData] = useState({ matches: [], teams: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [matchesRes, teamsRes] = await Promise.all([
        supabase.from('matches').select('*'),
        supabase.from('teams').select('*')
      ])

      if (matchesRes.error || teamsRes.error) {
        console.error('Error fetching data:', matchesRes.error || teamsRes.error)
      } else {
        // Map teams to match expected format { name, group }
        const mappedTeams = teamsRes.data.map(t => ({
          name: t.name,
          group: t.group_name
        }))
        setData({ matches: matchesRes.data, teams: mappedTeams })
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const fullTable = useMemo(() => {
    if (data.matches.length === 0 || data.teams.length === 0) return []
    return recalcularClassificacao(data.matches, data.teams)
  }, [data])

  const groupA = fullTable.filter(t => t.group === 'A')
  const groupB = fullTable.filter(t => t.group === 'B')

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-text-secondary font-bebas text-2xl tracking-widest">CARREGANDO CLASSIFICAÇÃO...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-bebas text-5xl text-white tracking-wider mb-2">
          TABELA DE <span className="text-accent">CLASSIFICAÇÃO</span>
        </h1>
        <p className="text-text-secondary font-medium">
          Acompanhe o desempenho das equipes e quem segue para a fase eliminatória.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-1 xl:grid-cols-2">
        <StandingsTable title="GRUPO A" teams={groupA} />
        <StandingsTable title="GRUPO B" teams={groupB} />
      </div>

      {/* Legend & Rules */}
      <div className="mt-16 glass-card rounded-2xl p-10 border-accent/20">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h3 className="font-bebas text-2xl text-accent mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              LEGENDA DE COLUNAS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col"><span className="font-bold text-accent uppercase tracking-tighter text-xs">P</span> <span className="text-text-secondary">Pontos</span></div>
              <div className="flex flex-col"><span className="font-bold text-accent uppercase tracking-tighter text-xs">J</span> <span className="text-text-secondary">Jogos</span></div>
              <div className="flex flex-col"><span className="font-bold text-accent uppercase tracking-tighter text-xs">V</span> <span className="text-text-secondary">Vitórias</span></div>
              <div className="flex flex-col"><span className="font-bold text-accent uppercase tracking-tighter text-xs">GP</span> <span className="text-text-secondary">Gols Pró</span></div>
              <div className="flex flex-col"><span className="font-bold text-accent uppercase tracking-tighter text-xs">GC</span> <span className="text-text-secondary">Gols Contra</span></div>
              <div className="flex flex-col"><span className="font-bold text-accent uppercase tracking-tighter text-xs">SG</span> <span className="text-text-secondary">Saldo de Gols</span></div>
            </div>
          </div>
          <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
            <h3 className="font-bebas text-2xl text-accent mb-6">SISTEMA DE PONTUÇÃO</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-text-primary font-bold">Vitória</span>
                <span className="px-3 py-1 bg-success/20 text-success rounded-lg font-bebas text-xl tracking-wider">03 PONTOS</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-text-primary font-bold">Empate</span>
                <span className="px-3 py-1 bg-white/10 text-text-secondary rounded-lg font-bebas text-xl tracking-wider">01 PONTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
