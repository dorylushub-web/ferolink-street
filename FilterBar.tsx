'use client'

import { ACTOR_LABELS, ActorType } from '@/lib/questionnaires'

export interface Filters {
  actorType: string
  city: string
  status: string
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  cities: string[]
}

const SELECT_CLASS = `
  flex-1 min-w-0 px-3 py-2 rounded-xl border-2 border-gray-200
  text-brand-dark text-sm bg-white
  focus:outline-none focus:border-brand-green
`

export default function FilterBar({ filters, onChange, cities }: Props) {
  const update = (field: keyof Filters, value: string) =>
    onChange({ ...filters, [field]: value })

  const hasFilters = filters.actorType || filters.city || filters.status

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {/* Filtre type */}
        <select
          value={filters.actorType}
          onChange={e => update('actorType', e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">Tous les types</option>
          {(Object.entries(ACTOR_LABELS) as [ActorType, string][]).map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>

        {/* Filtre statut */}
        <select
          value={filters.status}
          onChange={e => update('status', e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">Tous statuts</option>
          <option value="nouveau">Nouveau</option>
          <option value="contacté">Contacté</option>
          <option value="qualifié">Qualifié</option>
          <option value="rejeté">Rejeté</option>
        </select>
      </div>

      {/* Filtre ville */}
      {cities.length > 0 && (
        <select
          value={filters.city}
          onChange={e => update('city', e.target.value)}
          className={SELECT_CLASS + ' w-full'}
        >
          <option value="">Toutes les villes</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      )}

      {/* Bouton reset */}
      {hasFilters && (
        <button
          onClick={() => onChange({ actorType: '', city: '', status: '' })}
          className="text-sm text-red-500 underline"
        >
          ✕ Effacer les filtres
        </button>
      )}
    </div>
  )
}
