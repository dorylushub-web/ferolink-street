/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evite les erreurs de build liées aux variables Supabase manquantes
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
}

module.exports = nextConfig
