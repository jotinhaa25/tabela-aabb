#!/usr/bin/env python3
"""
Script de Seed: Popula as tabelas `teams` e `matches` no Supabase.

Uso:
    pip install python-dotenv httpx
    python execution/seed_supabase.py

Requer a variável SUPABASE_SERVICE_KEY no .env 
(diferente da ANON_KEY, a service_role key bypassa o RLS).
"""

import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SERVICE_KEY:
    print("❌ ERRO: Configure SUPABASE_SERVICE_KEY no arquivo .env")
    print("   Acesse: Supabase → Settings → API → service_role key")
    exit(1)

HEADERS = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# ─────────────────────────────────────────────
# DADOS DO CAMPEONATO
# ─────────────────────────────────────────────

TEAMS = [
    {"name": "CAIEX",              "group_name": "A"},
    {"name": "AMÉRICA",            "group_name": "A"},
    {"name": "NEW JOINVILLE",      "group_name": "A"},
    {"name": "LARANJA",            "group_name": "A"},
    {"name": "AMÉRICA BAR",        "group_name": "A"},
    {"name": "AMÉRICA HEINEKEN",   "group_name": "A"},
    {"name": "MONACO",             "group_name": "A"},
    {"name": "JOINVILLE",          "group_name": "B"},
    {"name": "AMÉRICA BALANCE",    "group_name": "B"},
    {"name": "BOLA/PUMA",          "group_name": "B"},
    {"name": "AMÉRICA BOB MARLEY", "group_name": "B"},
    {"name": "VIDA MANSA",         "group_name": "B"},
    {"name": "AMÉRICA GOLD",       "group_name": "B"},
    {"name": "GOELA SECA",         "group_name": "B"},
]

MATCHES = [
    # Rodada 1
    {"round": 1, "date": "2026-02-21", "time": "08:15", "field": "1", "home_team": "LARANJA",           "away_team": "VIDA MANSA",         "home_score": 3,    "away_score": 1,    "status": "finished"},
    {"round": 1, "date": "2026-02-21", "time": "10:00", "field": "1", "home_team": "MONACO",            "away_team": "AMÉRICA BALANCE",    "home_score": 2,    "away_score": 7,    "status": "finished"},
    {"round": 1, "date": "2026-02-21", "time": "11:30", "field": "1", "home_team": "CAIEX",             "away_team": "GOELA SECA",         "home_score": 4,    "away_score": 0,    "status": "finished"},
    {"round": 1, "date": "2026-02-21", "time": "08:15", "field": "2", "home_team": "AMÉRICA HEINEKEN",  "away_team": "AMÉRICA GOLD",       "home_score": 2,    "away_score": 4,    "status": "finished"},
    {"round": 1, "date": "2026-02-21", "time": "10:00", "field": "2", "home_team": "AMÉRICA",           "away_team": "AMÉRICA BOB MARLEY", "home_score": 0,    "away_score": 4,    "status": "finished"},
    {"round": 1, "date": "2026-02-21", "time": "11:30", "field": "2", "home_team": "AMÉRICA BAR",       "away_team": "BOLA/PUMA",          "home_score": 0,    "away_score": 7,    "status": "finished"},
    {"round": 1, "date": "2026-02-25", "time": "19:30", "field": "1", "home_team": "NEW JOINVILLE",     "away_team": "JOINVILLE",          "home_score": 0,    "away_score": 4,    "status": "finished"},
    # Rodada 2
    {"round": 2, "date": "2026-02-28", "time": "10:00", "field": "1", "home_team": "AMÉRICA HEINEKEN",  "away_team": "AMÉRICA BOB MARLEY", "home_score": 2,    "away_score": 0,    "status": "finished"},
    {"round": 2, "date": "2026-02-28", "time": "11:30", "field": "1", "home_team": "NEW JOINVILLE",     "away_team": "GOELA SECA",         "home_score": 8,    "away_score": 1,    "status": "finished"},
    {"round": 2, "date": "2026-02-28", "time": "10:00", "field": "2", "home_team": "LARANJA",           "away_team": "JOINVILLE",          "home_score": 1,    "away_score": 3,    "status": "finished"},
    {"round": 2, "date": "2026-02-28", "time": "11:30", "field": "2", "home_team": "MONACO",            "away_team": "VIDA MANSA",         "home_score": 0,    "away_score": 1,    "status": "finished"},
    {"round": 2, "date": "2026-02-28", "time": "10:30", "field": "3", "home_team": "AMÉRICA BAR",       "away_team": "AMÉRICA GOLD",       "home_score": 3,    "away_score": 2,    "status": "finished"},
    {"round": 2, "date": "2026-03-04", "time": "20:45", "field": "1", "home_team": "AMÉRICA",           "away_team": "AMÉRICA BALANCE",    "home_score": 7,    "away_score": 1,    "status": "finished"},
    # Rodada 3
    {"round": 3, "date": "2026-03-07", "time": "08:15", "field": "1", "home_team": "NEW JOINVILLE",     "away_team": "BOLA/PUMA",          "home_score": 3,    "away_score": 3,    "status": "finished"},
    {"round": 3, "date": "2026-03-07", "time": "10:00", "field": "1", "home_team": "MONACO",            "away_team": "JOINVILLE",          "home_score": 1,    "away_score": 3,    "status": "finished"},
    {"round": 3, "date": "2026-03-07", "time": "11:30", "field": "1", "home_team": "CAIEX",             "away_team": "AMÉRICA GOLD",       "home_score": 5,    "away_score": 0,    "status": "finished"},
    {"round": 3, "date": "2026-03-07", "time": "08:15", "field": "2", "home_team": "AMÉRICA BAR",       "away_team": "AMÉRICA BOB MARLEY", "home_score": 0,    "away_score": 6,    "status": "finished"},
    {"round": 3, "date": "2026-03-07", "time": "10:00", "field": "2", "home_team": "AMÉRICA HEINEKEN",  "away_team": "AMÉRICA BALANCE",    "home_score": 2,    "away_score": 4,    "status": "finished"},
    {"round": 3, "date": "2026-03-07", "time": "11:30", "field": "2", "home_team": "AMÉRICA",           "away_team": "VIDA MANSA",         "home_score": 5,    "away_score": 2,    "status": "finished"},
    {"round": 3, "date": "2026-03-07", "time": "10:30", "field": "3", "home_team": "LARANJA",           "away_team": "GOELA SECA",         "home_score": 12,   "away_score": 0,    "status": "finished"},
    # Rodada 4
    {"round": 4, "date": "2026-03-14", "time": "08:15", "field": "1", "home_team": "LARANJA",           "away_team": "AMÉRICA BALANCE",    "home_score": 2,    "away_score": 3,    "status": "finished"},
    {"round": 4, "date": "2026-03-14", "time": "10:00", "field": "1", "home_team": "CAIEX",             "away_team": "JOINVILLE",          "home_score": 3,    "away_score": 3,    "status": "finished"},
    {"round": 4, "date": "2026-03-14", "time": "11:30", "field": "1", "home_team": "NEW JOINVILLE",     "away_team": "VIDA MANSA",         "home_score": 2,    "away_score": 1,    "status": "finished"},
    {"round": 4, "date": "2026-03-14", "time": "08:15", "field": "2", "home_team": "AMÉRICA BAR",       "away_team": "GOELA SECA",         "home_score": 4,    "away_score": 4,    "status": "finished"},
    {"round": 4, "date": "2026-03-14", "time": "10:00", "field": "2", "home_team": "MONACO",            "away_team": "AMÉRICA BOB MARLEY", "home_score": 1,    "away_score": 6,    "status": "finished"},
    {"round": 4, "date": "2026-03-14", "time": "11:30", "field": "2", "home_team": "AMÉRICA HEINEKEN",  "away_team": "BOLA/PUMA",          "home_score": 0,    "away_score": 4,    "status": "finished"},
    {"round": 4, "date": "2026-03-14", "time": "10:30", "field": "3", "home_team": "AMÉRICA",           "away_team": "AMÉRICA GOLD",       "home_score": 13,   "away_score": 1,    "status": "finished"},
    # Rodada 5 - parcialmente disputada (MONACO x GOELA SECA ainda não aconteceu)
    {"round": 5, "date": "2026-03-21", "time": "08:15", "field": "1", "home_team": "AMÉRICA BAR",       "away_team": "AMÉRICA BALANCE",    "home_score": 1,    "away_score": 3,    "status": "finished"},
    {"round": 5, "date": "2026-03-21", "time": "10:00", "field": "1", "home_team": "AMÉRICA",           "away_team": "JOINVILLE",          "home_score": 2,    "away_score": 4,    "status": "finished"},
    {"round": 5, "date": "2026-03-21", "time": "11:30", "field": "1", "home_team": "AMÉRICA HEINEKEN",  "away_team": "VIDA MANSA",         "home_score": 0,    "away_score": 4,    "status": "finished"},
    {"round": 5, "date": "2026-03-21", "time": "08:15", "field": "2", "home_team": "NEW JOINVILLE",     "away_team": "AMÉRICA GOLD",       "home_score": 2,    "away_score": 2,    "status": "finished"},
    {"round": 5, "date": "2026-03-21", "time": "10:00", "field": "2", "home_team": "CAIEX",             "away_team": "AMÉRICA BOB MARLEY", "home_score": 4,    "away_score": 0,    "status": "finished"},
    {"round": 5, "date": "2026-03-21", "time": "10:30", "field": "3", "home_team": "LARANJA",           "away_team": "BOLA/PUMA",          "home_score": 2,    "away_score": 3,    "status": "finished"},
    {"round": 5, "date": "2026-03-24", "time": "20:00", "field": "1", "home_team": "MONACO",            "away_team": "GOELA SECA",         "home_score": None, "away_score": None, "status": "scheduled"},
]

def upsert(table: str, data: list) -> bool:
    """Faz upsert dos dados na tabela Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    params = {"on_conflict": "name"} if table == "teams" else {}
    resp = httpx.post(url, headers={**HEADERS, "Prefer": "resolution=ignore-duplicates,return=representation"}, json=data, params=params)
    if resp.status_code in (200, 201):
        return True
    print(f"   Status: {resp.status_code} | {resp.text[:300]}")
    return False

def clear_table(table: str) -> bool:
    """Remove todos os registros da tabela."""
    url = f"{SUPABASE_URL}/rest/v1/{table}?id=neq.00000000-0000-0000-0000-000000000000"
    resp = httpx.delete(url, headers=HEADERS)
    return resp.status_code in (200, 204)

def main():
    print("=" * 55)
    print("  SEED SUPABASE - Tabela AABB Campeonato 2026")
    print("=" * 55)

    print("\n[1/4] Limpando tabela matches...")
    if clear_table("matches"):
        print("   ✅ Tabela matches limpa.")
    else:
        print("   ⚠️  Não foi possível limpar matches (pode estar vazia).")

    print("\n[2/4] Limpando tabela teams...")
    if clear_table("teams"):
        print("   ✅ Tabela teams limpa.")
    else:
        print("   ⚠️  Não foi possível limpar teams (pode estar vazia).")

    print(f"\n[3/4] Inserindo {len(TEAMS)} times...")
    if upsert("teams", TEAMS):
        print(f"   ✅ {len(TEAMS)} times inseridos com sucesso.")
    else:
        print("   ❌ Erro ao inserir times.")
        return

    print(f"\n[4/4] Inserindo {len(MATCHES)} partidas (Rodadas 1-5)...")
    if upsert("matches", MATCHES):
        print(f"   ✅ {len(MATCHES)} partidas inseridas com sucesso.")
    else:
        print("   ❌ Erro ao inserir partidas.")
        return

    print("\n" + "=" * 55)
    print("  ✅ SEED COMPLETO! Acesse http://localhost:5173")
    print("=" * 55)

if __name__ == "__main__":
    main()
