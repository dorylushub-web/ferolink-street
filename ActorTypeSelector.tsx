'use client'

import { ActorType, ACTOR_LABELS } from '@/lib/questionnaires'

interface Props {
  selected: ActorType | null
  onSelect: (type: ActorType) => void
}

export default function ActorTypeSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl font-display font-bold text-brand-green mb-4">
        Type d'acteur
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {(Object.entries(ACTOR_LABELS) as [ActorType, string][]).map(([type, label]) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`
              w-full text-left px-5 py-4 rounded-xl border-2 font-semibold text-lg
              transition-all duration-150
              ${selected === type
                ? 'bg-brand-green text-white border-brand-green'
                : 'bg-white text-brand-dark border-gray-200 hover:border-brand-green hover:bg-brand-light'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
