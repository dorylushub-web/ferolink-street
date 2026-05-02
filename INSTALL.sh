#!/bin/bash
echo "======================================"
echo "  FEROLINK STREET V0 — INSTALLATION  "
echo "======================================"
echo ""

# 1. Vérifier Node
node_version=$(node --version 2>/dev/null)
if [ -z "$node_version" ]; then
  echo "❌ Node.js non trouvé. Installer Node.js 18+ depuis https://nodejs.org"
  exit 1
fi
echo "✅ Node.js : $node_version"

# 2. Configurer .env.local
if [ ! -f .env.local ] || grep -q "TON_PROJECT_ID" .env.local; then
  echo ""
  echo "⚙️  Configuration Supabase requise"
  echo "   Aller sur https://supabase.com → Ton projet → Settings → API"
  echo ""
  read -p "   SUPABASE_URL (ex: https://abc.supabase.co) : " url
  read -p "   SUPABASE_ANON_KEY : " key
  echo "NEXT_PUBLIC_SUPABASE_URL=$url" > .env.local
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$key" >> .env.local
  echo "✅ .env.local créé"
fi

# 3. Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
npm install

# 4. Lancer
echo ""
echo "🚀 Démarrage..."
npm run dev
