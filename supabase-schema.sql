-- Ferolink Street V0 — Schéma Supabase
-- Copier-coller dans l'éditeur SQL de ton projet Supabase

CREATE TABLE IF NOT EXISTS prospects (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_id            TEXT UNIQUE NOT NULL,
  actor_type          TEXT NOT NULL CHECK (actor_type IN ('commercant','producteur','transporteur','partenaire_local','client_pro')),
  full_name           TEXT NOT NULL,
  phone               TEXT NOT NULL,
  city                TEXT NOT NULL,
  zone                TEXT,
  contact_channel     TEXT,
  referred_by         TEXT,
  payment_preference  TEXT,
  answers             JSONB DEFAULT '{}',
  score_auto          INTEGER DEFAULT 0,
  score_manuel        INTEGER,
  score_final         INTEGER DEFAULT 0,
  status              TEXT DEFAULT 'nouveau' CHECK (status IN ('nouveau','contacte','qualifie','prioritaire','test','converti','perdu','archive')),
  notes               TEXT DEFAULT '',
  is_synced           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les filtres courants
CREATE INDEX IF NOT EXISTS idx_prospects_actor_type ON prospects(actor_type);
CREATE INDEX IF NOT EXISTS idx_prospects_city       ON prospects(city);
CREATE INDEX IF NOT EXISTS idx_prospects_status     ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_score      ON prospects(score_final DESC);

-- Row Level Security (optionnel pour V0, activer en prod)
-- ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
