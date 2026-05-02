# 🌍 Ferolink Street V0
### Outil terrain DORYLUS Africa

Application mobile-first / PWA pour la collecte de données stratégiques terrain au Sénégal.

---

## ⚡ Installation rapide

### Prérequis
- Node.js 18+ : https://nodejs.org
- Compte Supabase gratuit : https://supabase.com

### Étapes

```bash
# 1. Cloner / décompresser le projet
cd ferolink-street

# 2. Installer les dépendances
npm install

# 3. Configurer Supabase (copier le fichier exemple)
cp .env.local.example .env.local
# Puis éditer .env.local avec tes vraies clés Supabase

# 4. Créer la table dans Supabase
# → Dashboard Supabase → SQL Editor → coller le contenu de supabase-schema.sql → Run

# 5. Lancer en développement
npm run dev
```

Ouvre http://localhost:3000 dans ton navigateur.

---

## 🔑 Configuration Supabase

Dans `.env.local` :
```
NEXT_PUBLIC_SUPABASE_URL=https://TON_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TON_ANON_KEY
```

Trouver ces valeurs : Supabase Dashboard → Settings → API

> ⚠️ **L'app fonctionne aussi SANS Supabase** en mode local/offline.
> Les fiches sont sauvegardées dans le localStorage du téléphone.

---

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/` | Stats, navigation, sync |
| Nouvelle enquête | `/nouvelle` | Créer une fiche terrain |
| Fiches | `/fiches` | Liste, filtres, export CSV |

---

## 🏗️ Structure

```
src/
├── app/
│   ├── layout.tsx          ← Layout global + PWA meta
│   ├── page.tsx            ← Dashboard
│   ├── nouvelle/page.tsx   ← Création fiche (3 étapes)
│   └── fiches/page.tsx     ← Liste + filtres + export CSV
├── components/
│   ├── ActorTypeSelector   ← Choix type d'acteur
│   ├── IdentityForm        ← Formulaire identité complet
│   ├── DynamicQuestionnaire← Questions selon le type
│   ├── FicheCard           ← Carte fiche avec scoring
│   ├── FilterBar           ← Filtres type/ville/statut
│   └── Button              ← Bouton réutilisable
└── lib/
    ├── supabaseClient      ← Client Supabase + types
    ├── questionnaires      ← Questions par type d'acteur
    ├── scoring             ← Calcul score 0-100
    ├── localStore          ← Persistence localStorage
    └── sync                ← Sync Supabase + offline
```

---

## 🎯 Scoring

| Score | Niveau | Action |
|-------|--------|--------|
| ≥ 85  | 🔥 Prioritaire | Appeler immédiatement |
| ≥ 70  | 🟢 Fort | Planifier un test |
| ≥ 40  | 🟡 Moyen | Relancer plus tard |
| < 40  | 🔴 Faible | Non prioritaire |

---

## 📊 Export CSV

Le CSV inclut : ID, Type, Nom, Téléphone, Ville, Zone, Canal Contact, Référent, 
Mode Paiement, Score Auto, Score Manuel, Score Final, Statut, Synchronisé, Notes, Réponses JSON.

---

## 🔄 Mode Offline

1. Fiche créée → sauvegardée en `localStorage` avec `is_synced: false`
2. Retour réseau → sync automatique déclenchée
3. Sync manuelle → bouton "Synchroniser" sur dashboard et page fiches

---

## 📡 Vocabulaire technique

| Français | English | 中文 |
|----------|---------|------|
| Fiche terrain | Field record / Lead | 实地记录 |
| Synchroniser | Sync / Push to remote | 同步 |
| Hors ligne | Offline / Disconnected | 离线 |
| Score prospect | Lead score | 潜客评分 |
| Chaîne logistique | Supply chain | 供应链 |
| Transporteur | Carrier / Haulier | 承运人 |
| Producteur | Producer / Farmer | 生产者 |

