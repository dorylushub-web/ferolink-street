# 🚀 FEROLINK STREET V0 — Guide d'installation

## Prérequis
- Node.js >= 18
- npm >= 9
- Un compte Supabase (gratuit : supabase.com)

---

## 1. Installer les dépendances

```bash
cd ferolink-street
npm install
```

---

## 2. Configurer Supabase

### Étape A — Créer le projet Supabase
1. Va sur https://supabase.com
2. New Project → donne un nom → choisis une région (ex: Frankfurt)
3. Attends la création (~2 min)

### Étape B — Créer la table
1. Dashboard Supabase → SQL Editor → New Query
2. Colle le contenu de `supabase-schema.sql`
3. Clique Run

### Étape C — Récupérer les clés
1. Settings → API
2. Copie :
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon / public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Étape D — Configurer .env.local
```bash
cp .env.local.example .env.local
# Édite .env.local avec tes vraies clés
```

---

## 3. Lancer l'application

```bash
npm run dev
```

L'app tourne sur : http://localhost:3000

---

## 4. Sans Supabase (mode 100% offline)

L'app fonctionne sans Supabase !
- Les fiches sont sauvegardées dans localStorage
- L'export CSV fonctionne
- Le scoring fonctionne
- Quand tu ajoutes Supabase, la sync s'active automatiquement

---

## 5. Structure des pages

| URL | Description |
|-----|-------------|
| `/` | Dashboard — stats, actions |
| `/nouvelle` | Créer une fiche terrain |
| `/fiches` | Liste, filtres, export CSV |

---

## 6. Vocabulaire technique EN/ZH

| FR | EN | 中文 |
|----|----|------|
| Fiche terrain | Field record | 现场记录 (xiànchǎng jìlù) |
| Synchronisation | Sync / Data sync | 数据同步 (shùjù tóngtóng) |
| Hors ligne | Offline | 离线 (líxiàn) |
| Score prospect | Lead score | 潜在客户评分 (qiánzài kèhù pínfēn) |
| Export CSV | CSV export | CSV导出 (CSV dǎochū) |
| Chaîne logistique | Supply chain | 供应链 (gōngyìng liàn) |
| Acteur terrain | Field stakeholder | 现场利益相关者 |
