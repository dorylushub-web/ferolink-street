-- ============================================
-- FEROLINK STREET V0 — Schéma Supabase
-- Exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- Activation de l'extension UUID
create extension if not exists "uuid-ossp";

-- Table principale
create table if not exists prospects (
  id           uuid default uuid_generate_v4() primary key,
  local_id     text not null unique,
  actor_type   text not null check (actor_type in ('commercant','producteur','transporteur','partenaire','client_pro')),
  full_name    text not null,
  phone        text not null,
  city         text not null,
  answers      jsonb default '{}'::jsonb,
  score_auto   integer default 0,
  score_manuel integer,
  score_final  integer default 0,
  status       text default 'nouveau' check (status in ('nouveau','contacté','qualifié','rejeté')),
  notes        text default '',
  is_synced    boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Index pour les filtres fréquents
create index if not exists idx_prospects_actor_type on prospects(actor_type);
create index if not exists idx_prospects_city on prospects(city);
create index if not exists idx_prospects_status on prospects(status);

-- Trigger auto update_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_updated_at
  before update on prospects
  for each row execute procedure update_updated_at();

-- Politique RLS (Row Level Security) — mode terrain simple
alter table prospects enable row level security;

-- Politique : accès complet sans auth (mode terrain)
-- EN PRODUCTION : remplacer par une auth JWT Supabase
create policy "acces_libre_terrain"
  on prospects
  for all
  using (true)
  with check (true);

-- Vérification
select 'Table prospects créée avec succès ✅' as message;
