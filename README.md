# 🌍 FEROLINK STREET V0
### Outil Terrain — DORYLUS Africa

Application mobile-first de collecte de données stratégiques au Sénégal.  
Fonctionne **en ligne et hors ligne** (offline-first).

---

## ⚡ INSTALLATION EN 5 ÉTAPES

### Étape 1 — Cloner / Créer le projet

```bash
# Si tu as ce dossier déjà :
cd ferolink-street

# Sinon clone ou copie les fichiers
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Créer ta base Supabase

1. Va sur [supabase.com](https://supabase.com) → New Project
2. Choisis un nom, un mot de passe fort, la région **West EU (Ireland)** (plus proche Afrique)
3. Attends que le projet se crée (~2 minutes)
4. Va dans **SQL Editor** → New Query
5. Copie-colle tout le contenu de `supabase-schema.sql`
6. Clique **Run** ✅

### Étape 4 — Configurer les clés

1. Dans Supabase → Settings → API
2. Copie **Project URL** et **anon public key**
3. Ouvre `.env.local` et remplis :

```env
NEXT_PUBLIC_SUPABASE_URL=https://TON_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...ta_clé
```

### Étape 5 — Lancer l'application

```bash
npm run dev
```

Ouvre : **http://localhost:3000** 🎉

---

## 📱 UTILISATION SUR TÉLÉPHONE (réseau local)

```bash
# Lance sur toutes les interfaces réseau
npm run dev -- -H 0.0.0.0
```

Puis ouvre sur ton téléphone :  
`http://TON_IP_LOCAL:3000`  
(ex: `http://192.168.1.42:3000`)

Ton IP : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)

---

## 🌐 DÉPLOIEMENT PRODUCTION (Vercel - GRATUIT)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Puis dans Vercel Dashboard → Settings → Environment Variables
# Ajouter NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 🗂️ STRUCTURE DU PROJET

```
src/
├── app/
│   ├── page.tsx           ← Dashboard (stats + boutons)
│   ├── nouvelle/page.tsx  ← Créer une nouvelle fiche
│   └── fiches/page.tsx    ← Liste, filtres, export CSV
├── components/
│   ├── ActorTypeSelector  ← Choix du type d'acteur
│   ├── IdentityForm       ← Nom, téléphone, ville
│   ├── DynamicQuestionnaire ← Questions selon le type
│   ├── FicheCard          ← Affichage d'une fiche
│   ├── FilterBar          ← Filtres type/ville/statut
│   └── Button             ← Bouton réutilisable
└── lib/
    ├── supabaseClient.ts  ← Client Supabase + types
    ├── questionnaires.ts  ← Questions par type d'acteur
    ├── scoring.ts         ← Calcul du score (0-100)
    ├── localStore.ts      ← Stockage localStorage offline
    └── sync.ts            ← Synchronisation Supabase
```

---

## 🏗️ FONCTIONNALITÉS V0

| Fonctionnalité | Status |
|---|---|
| 5 types d'acteurs | ✅ |
| Formulaire identité | ✅ |
| Questionnaire dynamique | ✅ |
| Score automatique (0-100) | ✅ |
| Score manuel modifiable | ✅ |
| Sauvegarde Supabase | ✅ |
| Mode offline (localStorage) | ✅ |
| Sync automatique au retour réseau | ✅ |
| Indicateur online/offline | ✅ |
| Liste des fiches | ✅ |
| Filtres (type/ville/statut) | ✅ |
| Export CSV | ✅ |
| PWA installable | ✅ |
| Mobile-first | ✅ |

---

## 🔧 COMMANDES UTILES

```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Lancer en production
npm run lint     # Vérifier le code
```

---

## 🗃️ BASE DE DONNÉES

**Table : `prospects`**

| Champ | Type | Description |
|---|---|---|
| id | uuid | Identifiant Supabase |
| local_id | text | Identifiant local (offline) |
| actor_type | text | commercant/producteur/... |
| full_name | text | Nom complet |
| phone | text | Téléphone |
| city | text | Ville / Village |
| answers | jsonb | Réponses au questionnaire |
| score_auto | int | Score calculé automatiquement |
| score_manuel | int | Score corrigé manuellement |
| score_final | int | Score utilisé (manuel OU auto) |
| status | text | nouveau/contacté/qualifié/rejeté |
| notes | text | Notes terrain |
| is_synced | bool | Synchronisé avec Supabase ? |
| created_at | timestamp | Date de création |

---

## 🎨 COULEURS & DESIGN

| Variable | Valeur | Usage |
|---|---|---|
| brand.green | #1a4d2e | Principal, CTA |
| brand.gold | #c9a84c | Secondaire, accents |
| brand.dark | #2b2b2b | Textes |
| brand.cream | #f5f0e8 | Fond |
| brand.light | #e8f5e9 | Fond vert clair |

---

## 📞 SUPPORT

Projet : **DORYLUS Africa**  
Application : **Ferolink Street V0**

---

*Made for the field. Works offline. Syncs when possible.*
