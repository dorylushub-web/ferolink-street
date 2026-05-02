'use client'

import { ActorType, QUESTIONNAIRES, Question } from '@/lib/questionnaires'

interface Props {
  actorType: ActorType
  answers: Record<string, string>
  onChange: (answers: Record<string, string>) => void
}

const FIELD_CLASS = `
  w-full px-4 py-3 rounded-xl border-2 border-gray-200
  text-brand-dark text-base bg-white
  focus:outline-none focus:border-brand-green
  transition-colors duration-150
`
const LABEL_CLASS = 'block text-sm font-semibold text-brand-dark mb-1'

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string
  onChange: (v: string) => void
}) {
  if (question.type === 'yesno') {
    return (
      <div className="flex gap-3">
        {['Oui', 'Non'].map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`
              flex-1 py-3 rounded-xl border-2 font-semibold text-base
              transition-all duration-150
              ${value === opt
                ? 'bg-brand-green text-white border-brand-green'
                : 'bg-white text-brand-dark border-gray-200 hover:border-brand-green'
              }
            `}
          >
            {opt === 'Oui' ? '✅ Oui' : '❌ Non'}
          </button>
        ))}
      </div>
    )
  }

  if (question.type === 'select' && question.options) {
    return (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={FIELD_CLASS}
      >
        <option value="">— Choisir —</option>
        {question.options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }

  return (
    <input
      type={question.type === 'number' ? 'number' : 'text'}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={FIELD_CLASS}
      placeholder="Votre réponse..."
    />
  )
}

export default function DynamicQuestionnaire({ actorType, answers, onChange }: Props) {
  const questions = QUESTIONNAIRES[actorType] || []

  const updateAnswer = (id: string, value: string) => {
    onChange({ ...answers, [id]: value })
  }

  const answered = questions.filter(q => answers[q.id]).length

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-brand-green">
          Questionnaire
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {answered}/{questions.length}
        </span>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-brand-gold h-2 rounded-full transition-all duration-300"
          style={{ width: `${questions.length > 0 ? (answered / questions.length) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id}>
            <label className={LABEL_CLASS}>
              <span className="text-brand-gold mr-1">{i + 1}.</span>
              {q.label}
            </label>
            <QuestionField
              question={q}
              value={answers[q.id] || ''}
              onChange={v => updateAnswer(q.id, v)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
