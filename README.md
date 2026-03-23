# Tabela AABB - Sistema de Campeonato

Sistema web completo para gerenciamento de campeonatos esportivos com React + Tailwind + Supabase.

## Funcionalidades

- Autenticação (Admin e Visitante)
- Tabela de jogos por rodada
- Edição de placares (apenas admin)
- Classificação automática
- Atualização em tempo real
- Regulamento do campeonato

## Quick Start

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o Supabase:**
   - Crie um projeto em [supabase.com](https://supabase.com)
   - Execute o schema: `supabase-schema.sql`
   - Copie as credenciais para `.env`

3. **Crie o arquivo `.env`:**
   ```
   VITE_SUPABASE_URL=sua-url-do-supabase
   VITE_SUPABASE_ANON_KEY=sua-chave-anon
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## Credenciais Demo

- **Admin:** admin@aabb.com / admin123
- **Visitante:** visitor@aabb.com / visitor123

## Deploy no Netlify

1. Conecte o repositório ao Netlify
2. Adicione as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automático!

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── context/       # Contextos React (Auth)
├── data/          # Dados do campeonato
├── lib/           # Configurações (Supabase)
├── pages/         # Páginas da aplicação
├── utils/         # Funções utilitárias
└── App.jsx        # Componente principal
```
