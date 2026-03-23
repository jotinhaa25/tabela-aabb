# POP: Gerenciamento do App Tabela AABB

## Objetivo
Manter e evoluir o app de gerenciamento de campeonato de futebol da AABB.

## Stack
- **Frontend**: React 18 + Tailwind CSS + Vite
- **Backend**: Supabase (Auth, Database, Realtime)
- **Hospedagem**: Netlify

## Estrutura do Projeto
- `src/pages/` — Páginas: Login, Matches, Standings, Rules
- `src/components/` — Componentes reutilizáveis
- `src/context/` — Context API (AuthContext, etc.)
- `src/lib/` — Configuração do cliente Supabase
- `src/data/` — Dados estáticos/mock
- `src/utils/` — Funções utilitárias (cálculo de classificação)
- `supabase-schema.sql` — Schema completo do banco de dados

## Banco de Dados (Supabase)
- Tabela `teams`: id, name, group_name ('A' ou 'B'), created_at
- Tabela `matches`: id, round, date, time, field, home_team, away_team, home_score, away_score, status, created_at, updated_at

## Regras de Negócio
- Vitória = 3 pts, Empate = 1 pt, Derrota = 0 pts
- Critérios de desempate: Pontos > Confronto direto > Vitórias > Saldo de gols > Gols pró
- Apenas admins podem editar placares
- Atualizações em tempo real via Supabase Realtime

## Variáveis de Ambiente (`.env`)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Comandos
- Desenvolvimento: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Deploy
- Plataforma: Netlify
- Configuração: `netlify.toml` na raiz
- Branch principal: main

## Scripts de Execução (`execution/`)
- Futuros scripts de automação serão armazenados aqui
  - Ex: `execution/seed_matches.py`, `execution/backup_supabase.py`
