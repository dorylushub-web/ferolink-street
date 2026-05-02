import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Création sécurisée : ne crash pas si les clés sont absentes
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export type ActorType =
  | 'commercant'
  | 'producteur'
  | 'transporteur'
  | 'partenaire_local'
  | 'client_pro'

export type ProspectStatus =
  | 'nouveau'
  | 'contacte'
  | 'qualifie'
  | 'prioritaire'
  | 'test'
  | 'converti'
  | 'perdu'
  | 'archive'

export interface Prospect {
  id?: string
  local_id: string
  actor_type: ActorType
  full_name: string
  phone: string
  city: string
  zone?: string
  contact_channel?: string
  referred_by?: string
  payment_preference?: string
  answers: Record<string, string | number>
  score_auto: number
  score_manuel: number | null
  score_final: number
  status: ProspectStatus
  notes: string
  is_synced: boolean
  created_at?: string
  updated_at?: string
}
