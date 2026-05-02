'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Prospect } from '@/lib/supabaseClient'
import { getLocalProspects } from '@/lib/localStore'
import { fetchAllFromSupabase, syncAll } from '@/lib/sync'
import FicheCard from '@/components/FicheCard'
import FilterBar, { type Filters } from '@/components/FilterBar'
import { ACTOR_LABELS } from '@/lib/questionnaires'
import type { ActorType } from '@/lib/supabaseClient'

export default function FichesPage() {
  const router = useRouter()
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [filters, setFilters] = useState<Filters>({ actorType: '', city: '', status: '' })
  const [online, setOnline] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOnline(navigator.onLine)
    }
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadAll() {
    setLoading(true)

    // D'abord les données locales
    const local = getLocalProspects()
    setProspects(local)

    // Puis Supabase si connecté
    if (typeof window !== 'undefined' && navigator.onLine) {
      const remote = await fetchAllFromSupabase()
      if (remote.length > 0) {
        setProspects(remote)
      }
    }

    setLoading(false)
  }

  async function doSync() {
    if (!navigator.onLine) return
    setSyncing(true)
    await syncAll()
    await loadAll()
    setSyncing(false)
  }

  // Villes uniques pour le filtre
  const cities = [...new Set(prospects.map((p) => p.city).filter(Boolean))].sort()

  // Filtrage
  const filtered = prospects.filter((p) => {
    if (filters.actorType && p.actor_type !== filters.actorType) return false
    if (filters.city && p.city !== filters.city) return false
    if (filters.status && p.status !== filters.status) return false
    return true
  })

  // Export CSV
  const exportCSV = () => {
    const headers = [
      'ID', 'Type', 'Nom', 'Téléphone', 'Ville', 'Zone',
      'Canal Contact', 'Référent', 'Paiement Préféré',
      'Score Auto', 'Score Manuel', 'Score Final',
      'Statut', 'Synchronisé', 'Notes', 'Réponses',
    ]

    const rows = filtered.map((p) => [
      p.id || p.local_id,
      ACTOR_LABELS[p.actor_type as ActorType] || p.actor_type,
      p.full_name,
      p.phone,
      p.city,
      p.zone || '',
      p.contact_channel || '',
      p.referred_by || '',
      p.payment_preference || '',
      p.score_auto,
      p.score_manuel ?? '',
      p.score_final,
      p.status,
      p.is_synced ? 'Oui' : 'Non',
      p.notes || '',
      JSON.stringify(p.answers || {}),
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ferolink_export_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUpdate = (updated: Prospect) => {
    setProspects((prev) =>
      prev.map((p) => p.local_id === updated.local_id ? updated : p)
    )
  }

  const prioritaires = filtered.filter((p) => p.score_final >= 85).length

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => router.back()} className="text-2xl text-gray-400 hover:text-cream transition-colors">
          ←
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-brand-gold leading-tight">Fiches terrain</h1>
          <p className="text-xs text-gray-500">DORYLUS Africa</p>
        </div>
        <div className="flex items-center gap-2">
          {prioritaires > 0 && (
            <span className="bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              🔥 {prioritaires}
            </span>
          )}
          <span className="bg-brand-green text-cream text-sm font-bold px-3 py-1 rounded-full">
            {filtered.length}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="flex-1 bg-brand-gold text-brand-dark font-semibold py-3 rounded-xl hover:opacity-90 active:scale-98 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          📥 Export CSV
        </button>
        <button
          onClick={doSync}
          disabled={syncing || !online}
          className="flex-1 bg-brand-green text-cream font-semibold py-3 rounded-xl hover:opacity-90 active:scale-98 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {syncing ? (
            <>
              <span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
              Sync…
            </>
          ) : '🔄 Synchroniser'}
        </button>
      </div>

      {/* Filtres */}
      <div className="mb-4">
        <FilterBar filters={filters} onChange={setFilters} cities={cities} />
      </div>

      {/* Liste */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="text-5xl">📋</div>
          <p className="text-gray-400 text-lg">
            {prospects.length === 0
              ? 'Aucune fiche pour l\'instant'
              : 'Aucune fiche ne correspond aux filtres'}
          </p>
          {prospects.length === 0 && (
            <button
              onClick={() => router.push('/nouvelle')}
              className="bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-xl hover:opacity-90 active:scale-98 transition-all"
            >
              ➕ Créer la première fiche
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4 pb-8">
          {filtered.map((p) => (
            <FicheCard
              key={p.local_id || p.id}
              prospect={p}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
