import { useState, useMemo } from 'react'
import { useCardImages } from '../hooks/useCardImages'
import { addPreset, setActivePreset } from '../utils/presets'
import { LOADING_CARDS_MESSAGE } from '../constants'

interface CreatePresetProps {
  onBack: () => void
}

export function CreatePreset({ onBack }: CreatePresetProps) {
  const { cardUrls, loading } = useCardImages()
  const [order, setOrder] = useState<number[]>([])
  const [presetName, setPresetName] = useState('')

  const cardIndexes = useMemo(
    () => Array.from({ length: cardUrls.length }, (_, i) => i + 1),
    [cardUrls.length]
  )

  const toggleCard = (oneBasedIndex: number) => {
    setOrder((prev) => {
      const idx = prev.indexOf(oneBasedIndex)
      if (idx >= 0) return prev.filter((_, i) => i !== idx)
      return [...prev, oneBasedIndex]
    })
  }

  const allSelected = order.length === cardUrls.length

  const handleSave = () => {
    const name = presetName.trim() || `Preset ${Date.now()}`
    if (!allSelected) return
    addPreset(name, order)
    setActivePreset(name)
    onBack()
  }

  if (loading) {
    return (
      <div className="create-preset">
        <button type="button" className="secondary" onClick={onBack}>
          Back
        </button>
        <p>{LOADING_CARDS_MESSAGE}</p>
      </div>
    )
  }

  return (
    <div className="create-preset">
      <div className="create-preset-header">
        <button type="button" className="secondary" onClick={onBack}>
          Back
        </button>
        <h2>Create preset</h2>
      </div>
      <p className="create-preset-hint">Tap cards in the order you want. Then enter a name and save.</p>
      <div className="create-preset-order">
        Order: {order.length === 0 ? '—' : order.join(', ')}
      </div>
      <div className="create-preset-grid">
        {cardIndexes.map((oneBasedIndex) => {
          const url = cardUrls[oneBasedIndex - 1]
          const position = order.indexOf(oneBasedIndex)
          const isSelected = position >= 0
          return (
            <button
              key={oneBasedIndex}
              type="button"
              className={`create-preset-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleCard(oneBasedIndex)}
            >
              <img src={url} alt={`Card ${oneBasedIndex}`} />
              {isSelected && (
                <span className="create-preset-card-badge">{position + 1}</span>
              )}
            </button>
          )
        })}
      </div>
      <div className="create-preset-save">
        <input
          type="text"
          placeholder="Preset name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!allSelected}
        >
          Save preset
        </button>
        {!allSelected && cardUrls.length > 0 && (
          <p className="create-preset-hint">Select all {cardUrls.length} cards in desired order.</p>
        )}
      </div>
    </div>
  )
}
