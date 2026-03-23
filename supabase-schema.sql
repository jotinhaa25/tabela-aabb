-- =====================================================
-- SUPABASE SCHEMA - Tabela AABB Championship
-- =====================================================

-- 1. Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  group_name TEXT NOT NULL CHECK (group_name IN ('A', 'B')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name)
);

-- 2. Create matches table
CREATE TABLE IF NOT EXISTS matches (
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

-- 3. Create user_profiles table for role management
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Teams: Everyone can read
CREATE POLICY "teams_read" ON teams
  FOR SELECT USING (true);

-- Teams: Only admin can insert, update, delete
CREATE POLICY "teams_admin_all" ON teams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Matches: Everyone can read
CREATE POLICY "matches_read" ON matches
  FOR SELECT USING (true);

-- Matches: Only admin can insert, update, delete
CREATE POLICY "matches_admin_all" ON matches
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User profiles: Users can read their own profile
CREATE POLICY "user_profiles_read_own" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- 6. Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Enable realtime for matches
ALTER PUBLICATION supabase_realtime ADD TABLE matches;

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert teams
INSERT INTO teams (name, group_name) VALUES
  ('CAIEX', 'A'),
  ('AMÉRICA', 'A'),
  ('NEW JOINVILLE', 'A'),
  ('LARANJA', 'A'),
  ('AMÉRICA BAR', 'A'),
  ('AMÉRICA HEINEKEN', 'A'),
  ('MONACO', 'A'),
  ('JOINVILLE', 'B'),
  ('AMÉRICA BALANCE', 'B'),
  ('BOLA/PUMA', 'B'),
  ('AMÉRICA BOB MARLEY', 'B'),
  ('VIDA MANSA', 'B'),
  ('AMÉRICA GOLD', 'B'),
  ('GOELA SECA', 'B')
ON CONFLICT (name) DO NOTHING;

-- Insert matches (Round 1)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (1, '2026-02-21', '08:15', '1', 'LARANJA', 'VIDA MANSA', 3, 1, 'finished'),
  (1, '2026-02-21', '10:00', '1', 'MONACO', 'AMÉRICA BALANCE', 2, 7, 'finished'),
  (1, '2026-02-21', '11:30', '1', 'CAIEX', 'GOELA SECA', 4, 0, 'finished'),
  (1, '2026-02-21', '08:15', '2', 'AMÉRICA HEINEKEN', 'AMÉRICA GOLD', 2, 4, 'finished'),
  (1, '2026-02-21', '10:00', '2', 'AMÉRICA', 'AMÉRICA BOB MARLEY', 0, 4, 'finished'),
  (1, '2026-02-21', '11:30', '2', 'AMÉRICA BAR', 'BOLA/PUMA', 0, 7, 'finished'),
  (1, '2026-02-25', '19:30', '1', 'NEW JOINVILLE', 'JOINVILLE', 0, 4, 'finished')
ON CONFLICT DO NOTHING;

-- Insert matches (Round 2)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (2, '2026-02-28', '10:00', '1', 'AMÉRICA HEINEKEN', 'AMÉRICA BOB MARLEY', 2, 0, 'finished'),
  (2, '2026-02-28', '11:30', '1', 'NEW JOINVILLE', 'GOELA SECA', 8, 1, 'finished'),
  (2, '2026-02-28', '10:00', '2', 'LARANJA', 'JOINVILLE', 1, 3, 'finished'),
  (2, '2026-02-28', '11:30', '2', 'MONACO', 'VIDA MANSA', 0, 1, 'finished'),
  (2, '2026-02-28', '10:30', '3', 'AMÉRICA BAR', 'AMÉRICA GOLD', 3, 2, 'finished'),
  (2, '2026-03-04', '20:45', '1', 'AMÉRICA', 'AMÉRICA BALANCE', 7, 1, 'finished')
ON CONFLICT DO NOTHING;

-- Insert matches (Round 3)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (3, '2026-03-07', '08:15', '1', 'NEW JOINVILLE', 'BOLA/PUMA', 3, 3, 'finished'),
  (3, '2026-03-07', '10:00', '1', 'MONACO', 'JOINVILLE', 1, 3, 'finished'),
  (3, '2026-03-07', '11:30', '1', 'CAIEX', 'AMÉRICA GOLD', 5, 0, 'finished'),
  (3, '2026-03-07', '08:15', '2', 'AMÉRICA BAR', 'AMÉRICA BOB MARLEY', 0, 6, 'finished'),
  (3, '2026-03-07', '10:00', '2', 'AMÉRICA HEINEKEN', 'AMÉRICA BALANCE', 2, 4, 'finished'),
  (3, '2026-03-07', '11:30', '2', 'AMÉRICA', 'VIDA MANSA', 5, 2, 'finished'),
  (3, '2026-03-07', '10:30', '3', 'LARANJA', 'GOELA SECA', 12, 0, 'finished')
ON CONFLICT DO NOTHING;

-- Insert matches (Round 4)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (4, '2026-03-14', '08:15', '1', 'LARANJA', 'AMÉRICA BALANCE', 2, 3, 'finished'),
  (4, '2026-03-14', '10:00', '1', 'CAIEX', 'JOINVILLE', 3, 3, 'finished'),
  (4, '2026-03-14', '11:30', '1', 'NEW JOINVILLE', 'VIDA MANSA', 2, 1, 'finished'),
  (4, '2026-03-14', '08:15', '2', 'AMÉRICA BAR', 'GOELA SECA', 4, 4, 'finished'),
  (4, '2026-03-14', '10:00', '2', 'MONACO', 'AMÉRICA BOB MARLEY', 1, 6, 'finished'),
  (4, '2026-03-14', '11:30', '2', 'AMÉRICA HEINEKEN', 'BOLA/PUMA', 0, 4, 'finished'),
  (4, '2026-03-14', '10:30', '3', 'AMÉRICA', 'AMÉRICA GOLD', 13, 1, 'finished')
ON CONFLICT DO NOTHING;

-- Insert matches (Round 5)
INSERT INTO matches (round, date, time, field, home_team, away_team, home_score, away_score, status) VALUES
  (5, '2026-03-21', '08:15', '1', 'AMÉRICA BAR', 'AMÉRICA BALANCE', 1, 3, 'finished'),
  (5, '2026-03-21', '10:00', '1', 'AMÉRICA', 'JOINVILLE', 2, 4, 'finished'),
  (5, '2026-03-21', '11:30', '1', 'AMÉRICA HEINEKEN', 'VIDA MANSA', 0, 4, 'finished'),
  (5, '2026-03-21', '08:15', '2', 'NEW JOINVILLE', 'AMÉRICA GOLD', 2, 2, 'finished'),
  (5, '2026-03-21', '10:00', '2', 'CAIEX', 'AMÉRICA BOB MARLEY', 4, 0, 'finished'),
  (5, '2026-03-21', '10:30', '3', 'LARANJA', 'BOLA/PUMA', 2, 3, 'finished'),
  (5, '2026-03-24', '20:00', '1', 'MONACO', 'GOELA SECA', NULL, NULL, 'scheduled')
ON CONFLICT DO NOTHING;
