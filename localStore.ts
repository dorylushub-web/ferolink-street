import type { Prospect } from './supabaseClient'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'ferolink_prospects'

// EN: Generate unique local ID (UUID v4)
export function generateLocalId(): string {
  return uuidv4()
}

export function getLocalProspects(): Prospect[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Prospect[]
  } catch {
    return []
  }
}

// Aliases pour compatibilité
export const getAllLocal = getLocalProspects

export function saveLocalProspect(prospect: Prospect): void {
  if (typeof window === 'undefined') return
  const existing = getLocalProspects()
  const index = existing.findIndex((p) => p.local_id === prospect.local_id)
  if (index >= 0) {
    existing[index] = prospect
  } else {
    existing.push(prospect)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

export function updateLocalProspect(
  localId: string,
  updates: Partial<Prospect>
): void {
  if (typeof window === 'undefined') return
  const existing = getLocalProspects()
  const index = existing.findIndex((p) => p.local_id === localId)
  if (index >= 0) {
    existing[index] = { ...existing[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  }
}

export function deleteLocalProspect(localId: string): void {
  if (typeof window === 'undefined') return
  const existing = getLocalProspects()
  const filtered = existing.filter((p) => p.local_id !== localId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getUnsyncedProspects(): Prospect[] {
  return getLocalProspects().filter((p) => !p.is_synced)
}

// Alias
export const getUnsynced = getUnsyncedProspects
