# SPEC.md - Tabela AABB Championship App

## Project Overview

- **Project Name**: Tabela AABB
- **Type**: Web Application (React + Supabase)
- **Core Functionality**: Football championship management with live standings, match results editing, and real-time updates
- **Target Users**: Championship administrators (edit scores) and public viewers (view only)

## Technology Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Deployment**: Netlify

---

## UI/UX Specification

### Color Palette

- **Primary**: `#1e3a5f` (Dark Navy Blue)
- **Secondary**: `#2d5a87` (Medium Blue)
- **Accent**: `#f59e0b` (Amber/Gold)
- **Background**: `#0f172a` (Dark Slate)
- **Surface**: `#1e293b` (Slate)
- **Text Primary**: `#f8fafc` (Light)
- **Text Secondary**: `#94a3b8` (Slate Gray)
- **Success**: `#22c55e` (Green)
- **Warning**: `#eab308` (Yellow)
- **Error**: `#ef4444` (Red)

### Typography

- **Font Family**: `"Bebas Neue"` for headings, `"Barlow"` for body (Google Fonts)
- **Headings**:
  - H1: 48px, bold, uppercase
  - H2: 32px, bold
  - H3: 24px, semibold
- **Body**: 16px, regular
- **Small**: 14px

### Layout Structure

- **Header**: Logo + Navigation (Home, Matches, Standings, Rules) + Auth Status
- **Main Content**: Max-width 1200px, centered
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Pages

#### 1. Login Page
- Centered card with logo
- Email/Password fields
- Login button
- Demo credentials for testing

#### 2. Matches Page (Home)
- Tab navigation for rounds (1, 2, 3, 4, 5)
- Match cards showing:
  - Date, Time, Field
  - Home Team vs Away Team
  - Score (editable for admin, display only for visitors)
  - Live indicator

#### 3. Standings Page
- Two tables: Group A and Group B
- Columns: Position, Team, Pts, PJ, VIT, GP, GC, SG
- Highlight top positions with medal colors

#### 4. Rules Page
- Scrollable content area
- Championship rules and regulations

---

## Functionality Specification

### Authentication

- Supabase Auth with email/password
- User roles: `admin` and `viewer`
- Only admins can edit match scores
- Session persistence

### Match Management

- List all matches grouped by round
- Edit match scores (admin only)
- Real-time subscription to match updates
- Auto-refresh standings on score change

### Standings Calculation

```javascript
recalcularClassificacao(matches, teams)
```

**Rules**:
- Win = 3 points
- Draw = 1 point
- Loss = 0 points

**Sort Criteria** (in order):
1. Points (descending)
2. Head-to-head
3. Wins
4. Goal difference (GP - GC)
5. Goals for (GP)

**Output**: Sorted table with stats per team

### Database Schema (Supabase)

```sql
-- Teams table
teams (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  group_name TEXT NOT NULL, -- 'A' or 'B'
  created_at TIMESTAMP
)

-- Matches table
matches (
  id UUID PRIMARY KEY,
  round INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  field TEXT NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score INTEGER,
  away_score INTEGER,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'live', 'finished'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Users table (for auth)
-- Managed by Supabase Auth
```

### Realtime

- Subscribe to `matches` table changes
- Auto-update UI on external changes

---

## Acceptance Criteria

1. ✅ User can login with credentials
2. ✅ Admin can edit match scores
3. ✅ Visitors can only view (no edit)
4. ✅ Matches display grouped by round
5. ✅ Scores update in real-time (Realtime)
6. ✅ Standings calculate correctly per rules
7. ✅ Standings separate Group A and B
8. ✅ Rules page displays scrollable content
9. ✅ Responsive design works on mobile/tablet/desktop
10. ✅ Deploy ready for Netlify

---

## Data Source (SINGLE TRUTH)

All data comes from the JSON provided by user:
- 14 teams (7 per group)
- Matches for rounds 1-5
- Initial scores as provided