'use client'

interface IdentityData {
  full_name: string
  phone: string
  city: string
  notes: string
}

interface Props {
  data: IdentityData
  onChange: (data: IdentityData) => void
}

const FIELD_CLASS = `
  w-full px-4 py-3 rounded-xl border-2 border-gray-200
  text-brand-dark text-base bg-white
  focus:outline-none focus:border-brand-green
  transition-colors duration-150
`
const LABEL_CLASS = 'block text-sm font-semibold text-brand-dark mb-1'

export default function IdentityForm({ data, onChange }: Props) {
  const update = (field: keyof IdentityData, value: string) =>
    onChange({ ...data, [field]: value })

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-brand-green mb-4">
        Identité
      </h2>
      <div className="space-y-4">
        <div>
          <label className={LABEL_CLASS}>Nom complet *</label>
          <input
            type="text"
            value={data.full_name}
            onChange={e => update('full_name', e.target.value)}
            placeholder="Ex : Amadou Diallo"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS}>Téléphone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="Ex : +221 77 000 00 00"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS}>Ville / Village *</label>
          <input
            type="text"
            value={data.city}
            onChange={e => update('city', e.target.value)}
            placeholder="Ex : Thiès, Kaolack..."
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS}>Notes (optionnel)</label>
          <textarea
            value={data.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Observations terrain, informations complémentaires..."
            rows={3}
            className={FIELD_CLASS + ' resize-none'}
          />
        </div>
      </div>
    </div>
  )
}
