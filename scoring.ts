import { QUESTIONNAIRES } from './questionnaires'
import type { ActorType } from './supabaseClient'

// EN: Auto-score calculation / Lead scoring (0–100)
export function calculateAutoScore(
  actorType: ActorType,
  answers: Record<string, string | number>
): number {
  const questions = QUESTIONNAIRES[actorType]
  let totalPoints = 0
  let maxPoints = 0

  for (const question of questions) {
    if (!question.options) continue
    const maxForQuestion = Math.max(...question.options.map((o) => o.points))
    maxPoints += maxForQuestion
    const answer = answers[question.id]
    if (answer) {
      const option = question.options.find((o) => o.value === answer)
      if (option) totalPoints += option.points
    }
  }

  if (maxPoints === 0) return 0
  return Math.round((totalPoints / maxPoints) * 100)
}

// Aliases
export const computeAutoScore = calculateAutoScore

// EN: Final score = manual override OR auto score
export function getFinalScore(
  scoreAuto: number,
  scoreManuel: number | null
): number {
  return scoreManuel !== null && scoreManuel >= 0 ? scoreManuel : scoreAuto
}

export const computeFinalScore = getFinalScore

// EN: Score tier / Lead quality tier
export function getScoreLabel(score: number): {
  label: string
  color: string
  bg: string
  emoji: string
  action: string
  isPriority: boolean
} {
  if (score >= 85) {
    return {
      label: 'Prioritaire',
      color: 'text-orange-700',
      bg: 'bg-orange-100',
      emoji: '🔥',
      action: 'Appeler immédiatement',
      isPriority: true,
    }
  } else if (score >= 70) {
    return {
      label: 'Fort',
      color: 'text-emerald-700',
      bg: 'bg-emerald-100',
      emoji: '🟢',
      action: 'Planifier un test',
      isPriority: false,
    }
  } else if (score >= 40) {
    return {
      label: 'Moyen',
      color: 'text-amber-700',
      bg: 'bg-amber-100',
      emoji: '🟡',
      action: 'Relancer plus tard',
      isPriority: false,
    }
  } else {
    return {
      label: 'Faible',
      color: 'text-red-700',
      bg: 'bg-red-100',
      emoji: '🔴',
      action: 'Non prioritaire',
      isPriority: false,
    }
  }
}

// EN: Score-based action recommendation
export function getActionFromScore(score: number): string {
  return getScoreLabel(score).action
}
