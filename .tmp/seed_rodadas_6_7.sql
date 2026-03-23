-- =====================================================
-- SEED RODADAS 6 e 7 - Tabela AABB Campeonato 2026
-- Execute no Supabase SQL Editor
-- =====================================================

-- Rodada 6
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (6, '2026-03-28', '08:15', '1', 'MONACO',            'BOLA/PUMA',          NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '10:00', '1', 'NEW JOINVILLE',     'AMÉRICA BOB MARLEY', NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '11:30', '1', 'LARANJA',           'AMÉRICA GOLD',       NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '08:15', '2', 'AMÉRICA',           'GOELA SECA',         NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '10:00', '2', 'AMÉRICA HEINEKEN',  'JOINVILLE',          NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '11:30', '2', 'CAIEX',             'AMÉRICA BALANCE',    NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '10:30', '3', 'AMÉRICA BAR',       'VIDA MANSA',         NULL, NULL, 'scheduled');

-- Rodada 7
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (7, '2026-04-11', '08:15', '1', 'AMÉRICA HEINEKEN',  'GOELA SECA',         NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '10:00', '1', 'AMÉRICA',           'BOLA/PUMA',          NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '11:30', '1', 'AMÉRICA BAR',       'JOINVILLE',          NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '08:15', '2', 'NEW JOINVILLE',     'AMÉRICA BALANCE',    NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '10:00', '2', 'LARANJA',           'AMÉRICA BOB MARLEY', NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '11:30', '2', 'MONACO',            'AMÉRICA GOLD',       NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '10:30', '3', 'CAIEX',             'VIDA MANSA',         NULL, NULL, 'scheduled');
