import { supabase } from './supabaseClient'
import type { Prospect } from './supabaseClient'
import {
  getLocalProspects,
  getUnsyncedProspects,
  updateLocalProspect,
  saveLocalProspect,
} from './localStore'

// EN: Push a single record to Supabase (upsert by local_id)
export async function pushProspectToSupabase(
  prospect: Prospect
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase non configuré' }
  }
  try {
    const payload = { ...prospect, is_synced: true }
    const { data, error } = await supabase
      .from('prospects')
      .upsert(payload, { onConflict: 'local_id' })
      .select('id')
      .single()

    if (error) throw error
    return { success: true, id: data?.id }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    return { success: false, error: message }
  }
}

// EN: Save prospect locally, then try to sync
export async function saveProspect(
  prospect: Prospect
): Promise<{ offline: boolean; error?: string }> {
  // Toujours sauvegarder en local d'abord
  saveLocalProspect({ ...prospect, is_synced: false })

  if (!navigator.onLine || !supabase) {
    return { offline: true }
  }

  const result = await pushProspectToSupabase(prospect)
  if (result.success) {
    updateLocalProspect(prospect.local_id, {
      is_synced: true,
      id: result.id,
    })
    return { offline: false }
  }

  return { offline: true, error: result.error }
}

// EN: Batch sync all unsynced records
export async function syncAll(): Promise<{ synced: number; failed: number }> {
  const unsynced = getUnsyncedProspects()
  let synced = 0
  let failed = 0

  for (const prospect of unsynced) {
    const result = await pushProspectToSupabase(prospect)
    if (result.success) {
      updateLocalProspect(prospect.local_id, {
        is_synced: true,
        id: result.id,
      })
      synced++
    } else {
      failed++
    }
  }

  return { synced, failed }
}

// Alias pour compatibilité avec pages existantes
export async function syncPendingProspects() { const r = await syncAll(); return { synced: r.synced, errors: r.failed } }

// EN: Fetch all records from Supabase
export async function fetchAllFromSupabase(): Promise<Prospect[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('prospects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Prospect[]) || []
  } catch {
    return []
  }
}

// EN: Load prospects — remote first, local fallback
export async function loadProspects(): Promise<{
  prospects: Prospect[]
  source: 'remote' | 'local'
}> {
  if (!navigator.onLine || !supabase) {
    return { prospects: getLocalProspects(), source: 'local' }
  }

  const remote = await fetchAllFromSupabase()
  if (remote.length > 0) {
    for (const p of remote) {
      saveLocalProspect({ ...p, is_synced: true })
    }
    return { prospects: remote, source: 'remote' }
  }

  return { prospects: getLocalProspects(), source: 'local' }
}
