-- =====================================================
-- SEED RODADAS 6 ATÉ A FINAL (16)
-- Campeonato Interno AABB 2026
-- Execute no Supabase SQL Editor
-- =====================================================

-- 1. Alterar o limite de rodadas na tabela (de 10 para 16)
ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_round_check;
ALTER TABLE matches ADD CONSTRAINT matches_round_check CHECK (round >= 1 AND round <= 16);

-- 2. Inserir todas as rodadas pendentes
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  
  -- ==========================================
  -- RODADA 6 (Fase 1)
  -- ==========================================
  (6, '2026-03-28', '08:15', '1', 'MONACO',            'BOLA/PUMA',          NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '10:00', '1', 'NEW JOINVILLE',     'AMÉRICA BOB MARLEY', NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '11:30', '1', 'LARANJA',           'AMÉRICA GOLD',       NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '08:15', '2', 'AMÉRICA',           'GOELA SECA',         NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '10:00', '2', 'AMÉRICA HEINEKEN',  'JOINVILLE',          NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '11:30', '2', 'CAIEX',             'AMÉRICA BALANCE',    NULL, NULL, 'scheduled'),
  (6, '2026-03-28', '10:30', '3', 'AMÉRICA BAR',       'VIDA MANSA',         NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 7 (Fase 1)
  -- ==========================================
  (7, '2026-04-11', '08:15', '1', 'AMÉRICA HEINEKEN',  'GOELA SECA',         NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '10:00', '1', 'AMÉRICA',           'BOLA/PUMA',          NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '11:30', '1', 'AMÉRICA BAR',       'JOINVILLE',          NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '08:15', '2', 'NEW JOINVILLE',     'AMÉRICA BALANCE',    NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '10:00', '2', 'LARANJA',           'AMÉRICA BOB MARLEY', NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '11:30', '2', 'MONACO',            'AMÉRICA GOLD',       NULL, NULL, 'scheduled'),
  (7, '2026-04-11', '10:30', '3', 'CAIEX',             'VIDA MANSA',         NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 8 (Fase 2 - 1ª Rodada Taças A e B)
  -- ==========================================
  (8, '2026-04-18', '08:15', '1', '1ºB', '4ºM', NULL, NULL, 'scheduled'),
  (8, '2026-04-18', '10:00', '1', '2ºA', '3ºB', NULL, NULL, 'scheduled'),
  (8, '2026-04-18', '10:30', '3', '2ºB', '3ºA', NULL, NULL, 'scheduled'),
  (8, '2026-04-18', '08:15', '2', '5ºA', '7ºB', NULL, NULL, 'scheduled'),
  (8, '2026-04-18', '10:00', '2', '5ºB', '7ºA', NULL, NULL, 'scheduled'),
  (8, '2026-04-18', '11:30', '2', '6ºA', '6ºB', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 9 (Fase 2 - 2ª Rodada Taças A e B)
  -- ==========================================
  (9, '2026-04-25', '08:15', '2', '2ºA', '2ºB', NULL, NULL, 'scheduled'),
  (9, '2026-04-25', '10:00', '2', '1ºA', '4ºM', NULL, NULL, 'scheduled'),
  (9, '2026-04-25', '11:30', '2', '1ºB', '3ºA', NULL, NULL, 'scheduled'),
  (9, '2026-04-25', '08:15', '1', '5ºB', '6ºA', NULL, NULL, 'scheduled'),
  (9, '2026-04-25', '10:00', '1', '4ºP', '7ºB', NULL, NULL, 'scheduled'),
  (9, '2026-04-25', '10:30', '3', '5ºA', '6ºB', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 10 (Fase 2 - 3ª Rodada Taças A e B)
  -- ==========================================
  (10, '2026-05-02', '08:15', '1', '3ºA', '4ºM', NULL, NULL, 'scheduled'),
  (10, '2026-05-02', '10:00', '1', '1ºB', '2ºA', NULL, NULL, 'scheduled'),
  (10, '2026-05-02', '10:30', '3', '1ºA', '3ºB', NULL, NULL, 'scheduled'),
  (10, '2026-05-02', '08:15', '2', '6ºB', '7ºB', NULL, NULL, 'scheduled'),
  (10, '2026-05-02', '10:00', '2', '5ºA', '5ºB', NULL, NULL, 'scheduled'),
  (10, '2026-05-02', '11:30', '2', '4ºP', '7ºA', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 11 (Fase 2 - 4ª Rodada Taças A e B)
  -- ==========================================
  (11, '2026-05-09', '08:15', '2', '1ºA', '3ºA', NULL, NULL, 'scheduled'),
  (11, '2026-05-09', '10:00', '2', '2ºB', '3ºB', NULL, NULL, 'scheduled'),
  (11, '2026-05-09', '11:30', '2', '2ºA', '4ºM', NULL, NULL, 'scheduled'),
  (11, '2026-05-09', '08:15', '1', '4ºP', '6ºB', NULL, NULL, 'scheduled'),
  (11, '2026-05-09', '10:00', '1', '6ºA', '7ºA', NULL, NULL, 'scheduled'),
  (11, '2026-05-09', '10:30', '3', '5ºB', '7ºB', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 12 (Fase 2 - 5ª Rodada Taças A e B)
  -- ==========================================
  (12, '2026-05-16', '08:15', '1', '1ºB', '3ºB', NULL, NULL, 'scheduled'),
  (12, '2026-05-16', '10:00', '1', '1ºA', '2ºB', NULL, NULL, 'scheduled'),
  (12, '2026-05-16', '10:30', '3', '2ºA', '3ºA', NULL, NULL, 'scheduled'),
  (12, '2026-05-16', '08:15', '2', '5ºA', '7ºA', NULL, NULL, 'scheduled'),
  (12, '2026-05-16', '10:00', '2', '4ºP', '6ºA', NULL, NULL, 'scheduled'),
  (12, '2026-05-16', '11:30', '2', '5ºB', '6ºB', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 13 (Fase 2 - 6ª Rodada Taças A e B)
  -- ==========================================
  (13, '2026-05-23', '08:15', '2', '1ºB', '2ºB', NULL, NULL, 'scheduled'),
  (13, '2026-05-23', '10:00', '2', '3ºB', '4ºM', NULL, NULL, 'scheduled'),
  (13, '2026-05-23', '11:30', '2', '1ºA', '2ºA', NULL, NULL, 'scheduled'),
  (13, '2026-05-23', '08:15', '1', '5ºA', '6ºA', NULL, NULL, 'scheduled'),
  (13, '2026-05-23', '10:00', '1', '7ºA', '7ºB', NULL, NULL, 'scheduled'),
  (13, '2026-05-23', '10:30', '3', '4ºP', '5ºB', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 14 (Fase 2 - 7ª Rodada Taças A e B)
  -- ==========================================
  (14, '2026-05-30', '08:15', '1', '2ºB', '4ºM', NULL, NULL, 'scheduled'),
  (14, '2026-05-30', '08:15', '2', '3ºA', '3ºB', NULL, NULL, 'scheduled'),
  (14, '2026-05-30', '10:30', '1', '1ºA', '1ºB', NULL, NULL, 'scheduled'),
  (14, '2026-05-30', '10:15', '2', '6ºA', '7ºB', NULL, NULL, 'scheduled'),
  (14, '2026-05-30', '10:15', '3', '6ºB', '7ºA', NULL, NULL, 'scheduled'),
  (14, '2026-05-30', '11:30', '1', '4ºP', '5ºA', NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 15 (Semifinais)
  -- ==========================================
  (15, '2026-06-06', '08:30', '2', '1º Taça Prata', '4º Taça Prata', NULL, NULL, 'scheduled'),
  (15, '2026-06-06', '10:00', '2', '2º Taça Prata', '3º Taça Prata', NULL, NULL, 'scheduled'),
  (15, '2026-06-06', '08:30', '1', '1º Taça Ouro',  '4º Taça Ouro',  NULL, NULL, 'scheduled'),
  (15, '2026-06-06', '10:00', '1', '2º Taça Ouro',  '3º Taça Ouro',  NULL, NULL, 'scheduled'),

  -- ==========================================
  -- RODADA 16 (Finais)
  -- ==========================================
  (16, '2026-06-13', '08:30', '1', 'Vencedor Semi Prata 1', 'Vencedor Semi Prata 2', NULL, NULL, 'scheduled'),
  (16, '2026-06-13', '10:00', '1', 'Vencedor Semi Ouro 1',  'Vencedor Semi Ouro 2',  NULL, NULL, 'scheduled');
