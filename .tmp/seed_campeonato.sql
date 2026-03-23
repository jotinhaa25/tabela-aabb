-- =====================================================
-- FIX SCHEMA COMPLETO + SEED DATA
-- Tabela AABB Campeonato 2026
-- Execute no Supabase SQL Editor
-- =====================================================

-- 1. Dropar tabelas existentes (ordem importa)
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS user_profiles;

-- 2. Criar tabela user_profiles (necessária para RLS das outras)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela teams
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL CHECK (group_name IN ('A', 'B')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Criar tabela matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round INTEGER NOT NULL CHECK (round >= 1 AND round <= 10),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  field TEXT NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score INTEGER CHECK (home_score >= 0),
  away_score INTEGER CHECK (away_score >= 0),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Habilitar RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 6. Políticas RLS
-- Times: leitura pública
CREATE POLICY "teams_read" ON teams FOR SELECT USING (true);

-- Partidas: leitura pública
CREATE POLICY "matches_read" ON matches FOR SELECT USING (true);

-- Partidas: apenas admin pode inserir/editar/deletar
CREATE POLICY "matches_admin_write" ON matches
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Perfis: usuário lê o próprio
CREATE POLICY "user_profiles_read_own" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- 7. Trigger para criar perfil ao registrar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SEED TIMES
-- =====================================================
INSERT INTO teams (name, group_name) VALUES
  ('CAIEX',              'A'),
  ('AMÉRICA',            'A'),
  ('NEW JOINVILLE',      'A'),
  ('LARANJA',            'A'),
  ('AMÉRICA BAR',        'A'),
  ('AMÉRICA HEINEKEN',   'A'),
  ('MONACO',             'A'),
  ('JOINVILLE',          'B'),
  ('AMÉRICA BALANCE',    'B'),
  ('BOLA/PUMA',          'B'),
  ('AMÉRICA BOB MARLEY', 'B'),
  ('VIDA MANSA',         'B'),
  ('AMÉRICA GOLD',       'B'),
  ('GOELA SECA',         'B');

-- =====================================================
-- SEED PARTIDAS
-- =====================================================

-- Rodada 1 (21 e 25 de Fev)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (1, '2026-02-21', '08:15', '1', 'LARANJA',          'VIDA MANSA',         3,  1,    'finished'),
  (1, '2026-02-21', '10:00', '1', 'MONACO',            'AMÉRICA BALANCE',    2,  7,    'finished'),
  (1, '2026-02-21', '11:30', '1', 'CAIEX',             'GOELA SECA',         4,  0,    'finished'),
  (1, '2026-02-21', '08:15', '2', 'AMÉRICA HEINEKEN',  'AMÉRICA GOLD',       2,  4,    'finished'),
  (1, '2026-02-21', '10:00', '2', 'AMÉRICA',           'AMÉRICA BOB MARLEY', 0,  4,    'finished'),
  (1, '2026-02-21', '11:30', '2', 'AMÉRICA BAR',       'BOLA/PUMA',          0,  7,    'finished'),
  (1, '2026-02-25', '19:30', '1', 'NEW JOINVILLE',     'JOINVILLE',          0,  4,    'finished');

-- Rodada 2 (28 de Fev e 4 Mar)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (2, '2026-02-28', '10:00', '1', 'AMÉRICA HEINEKEN',  'AMÉRICA BOB MARLEY', 2,  0,    'finished'),
  (2, '2026-02-28', '11:30', '1', 'NEW JOINVILLE',     'GOELA SECA',         8,  1,    'finished'),
  (2, '2026-02-28', '10:00', '2', 'LARANJA',           'JOINVILLE',          1,  3,    'finished'),
  (2, '2026-02-28', '11:30', '2', 'MONACO',            'VIDA MANSA',         0,  1,    'finished'),
  (2, '2026-02-28', '10:30', '3', 'AMÉRICA BAR',       'AMÉRICA GOLD',       3,  2,    'finished'),
  (2, '2026-03-04', '20:45', '1', 'AMÉRICA',           'AMÉRICA BALANCE',    7,  1,    'finished');

-- Rodada 3 (7 Mar)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (3, '2026-03-07', '08:15', '1', 'NEW JOINVILLE',     'BOLA/PUMA',          3,  3,    'finished'),
  (3, '2026-03-07', '10:00', '1', 'MONACO',            'JOINVILLE',          1,  3,    'finished'),
  (3, '2026-03-07', '11:30', '1', 'CAIEX',             'AMÉRICA GOLD',       5,  0,    'finished'),
  (3, '2026-03-07', '08:15', '2', 'AMÉRICA BAR',       'AMÉRICA BOB MARLEY', 0,  6,    'finished'),
  (3, '2026-03-07', '10:00', '2', 'AMÉRICA HEINEKEN',  'AMÉRICA BALANCE',    2,  4,    'finished'),
  (3, '2026-03-07', '11:30', '2', 'AMÉRICA',           'VIDA MANSA',         5,  2,    'finished'),
  (3, '2026-03-07', '10:30', '3', 'LARANJA',           'GOELA SECA',         12, 0,    'finished');

-- Rodada 4 (14 Mar)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (4, '2026-03-14', '08:15', '1', 'LARANJA',           'AMÉRICA BALANCE',    2,  3,    'finished'),
  (4, '2026-03-14', '10:00', '1', 'CAIEX',             'JOINVILLE',          3,  3,    'finished'),
  (4, '2026-03-14', '11:30', '1', 'NEW JOINVILLE',     'VIDA MANSA',         2,  1,    'finished'),
  (4, '2026-03-14', '08:15', '2', 'AMÉRICA BAR',       'GOELA SECA',         4,  4,    'finished'),
  (4, '2026-03-14', '10:00', '2', 'MONACO',            'AMÉRICA BOB MARLEY', 1,  6,    'finished'),
  (4, '2026-03-14', '11:30', '2', 'AMÉRICA HEINEKEN',  'BOLA/PUMA',          0,  4,    'finished'),
  (4, '2026-03-14', '10:30', '3', 'AMÉRICA',           'AMÉRICA GOLD',       13, 1,    'finished');

-- Rodada 5 (21 e 24 Mar — MONACO x GOELA SECA ainda não disputado)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (5, '2026-03-21', '08:15', '1', 'AMÉRICA BAR',       'AMÉRICA BALANCE',    1,    3,    'finished'),
  (5, '2026-03-21', '10:00', '1', 'AMÉRICA',           'JOINVILLE',          2,    4,    'finished'),
  (5, '2026-03-21', '11:30', '1', 'AMÉRICA HEINEKEN',  'VIDA MANSA',         0,    4,    'finished'),
  (5, '2026-03-21', '08:15', '2', 'NEW JOINVILLE',     'AMÉRICA GOLD',       2,    2,    'finished'),
  (5, '2026-03-21', '10:00', '2', 'CAIEX',             'AMÉRICA BOB MARLEY', 4,    0,    'finished'),
  (5, '2026-03-21', '10:30', '3', 'LARANJA',           'BOLA/PUMA',          2,    3,    'finished'),
  (5, '2026-03-24', '20:00', '1', 'MONACO',            'GOELA SECA',         NULL, NULL, 'scheduled');

-- =====================================================
-- Verificação final
-- =====================================================
SELECT 'Times: '     || COUNT(*) AS resultado FROM teams
UNION ALL
SELECT 'Partidas: '  || COUNT(*) FROM matches;
