'use client'

import { useState } from 'react'
import { Prospect } from '@/lib/supabaseClient'
import { ACTOR_LABELS, ActorType } from '@/lib/questionnaires'
import { getScoreLevel, SCORE_COLORS, SCORE_ICONS, SCORE_LABELS, computeFinalScore } from '@/lib/scoring'
import { updateScoreManuel } from '@/lib/sync'

interface Props {
  prospect: Prospect
  onUpdate?: (updated: Prospect) => void
}

const STATUS_COLORS: Record<string, string> = {
  nouveau:   'bg-blue-100 text-blue-800',
  contacté:  'bg-yellow-100 text-yellow-800',
  qualifié:  'bg-green-100 text-green-800',
  rejeté:    'bg-red-100 text-red-800',
}

export default function FicheCard({ prospect, onUpdate }: Props) {
  const [editScore, setEditScore] = useState(false)
  const [tempScore, setTempScore] = useState(
    prospect.score_manuel !== null ? String(prospect.score_manuel) : ''
  )
  const [saving, setSaving] = useState(false)

  const level = getScoreLevel(prospect.score_final)

  const handleSaveScore = async () => {
    const val = parseInt(tempScore)
    if (isNaN(val) || val < 0 || val > 100) return
    setSaving(true)
    const final = computeFinalScore(prospect.score_auto, val)
    await updateScoreManuel(prospect, val, final)
    setSaving(false)
    setEditScore(false)
    if (onUpdate) {
      onUpdate({ ...prospect, score_manuel: val, score_final: final })
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-brand-dark text-lg leading-tight">
            {prospect.full_name}
          </h3>
          <p className="text-sm text-gray-500">{prospect.city}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full font-medium">
            {ACTOR_LABELS[prospect.actor_type as ActorType]}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[prospect.status] || 'bg-gray-100'}`}>
            {prospect.status}
          </span>
        </div>
      </div>

      {/* Contact */}
      <div className="text-sm text-gray-600">
        📞 {prospect.phone}
      </div>

      {/* Score */}
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${SCORE_COLORS[level]}`}>
          <span>{SCORE_ICONS[level]}</span>
          <span className="font-bold text-lg">{prospect.score_final}</span>
          <span className="text-sm">/100 — {SCORE_LABELS[level]}</span>
        </div>

        <button
          onClick={() => setEditScore(!editScore)}
          className="text-xs text-brand-green underline"
        >
          ✏️ Score manuel
        </button>
      </div>

      {/* Édition score manuel */}
      {editScore && (
        <div className="flex items-center gap-2 p-3 bg-brand-light rounded-xl">
          <input
            type="number"
            min={0}
            max={100}
            value={tempScore}
            onChange={e => setTempScore(e.target.value)}
            placeholder="0-100"
            className="flex-1 px-3 py-2 rounded-lg border-2 border-brand-green text-center text-lg font-bold"
          />
          <button
            onClick={handleSaveScore}
            disabled={saving}
            className="bg-brand-green text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? '...' : '✓'}
          </button>
          <button
            onClick={() => setEditScore(false)}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sync status */}
      <div className="flex items-center gap-2 text-xs">
        {prospect.is_synced ? (
          <span className="text-green-600">✅ Synchronisé</span>
        ) : (
          <span className="text-orange-500">⏳ En attente de sync</span>
        )}
        {prospect.created_at && (
          <span className="text-gray-400 ml-auto">
            {new Date(prospect.created_at).toLocaleDateString('fr-FR')}
          </span>
        )}
      </div>

      {/* Notes */}
      {prospect.notes && (
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2 italic">
          💬 {prospect.notes}
        </div>
      )}
    </div>
  )
}
