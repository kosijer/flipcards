import { useState, useEffect } from 'react'
import { getPresets, getActivePreset, setActivePreset, deletePreset } from '../utils/presets'

interface PresetManagerProps {
  onBack: () => void
  onCreatePreset: () => void
}

export function PresetManager({ onBack, onCreatePreset }: PresetManagerProps) {
  const [presets, setPresets] = useState<Record<string, number[]>>({})
  const [activePreset, setActive] = useState<string | null>(null)

  const refresh = () => {
    setPresets(getPresets())
    setActive(getActivePreset())
  }

  useEffect(() => {
    refresh()
  }, [])

  const handleSelect = (name: string) => {
    setActivePreset(name)
    setActive(name)
  }

  const handleDelete = (name: string) => {
    if (window.confirm(`Delete preset "${name}"?`)) {
      deletePreset(name)
      refresh()
    }
  }

  const names = Object.keys(presets)

  return (
    <div className="preset-manager">
      <div className="preset-manager-header">
        <button type="button" className="secondary" onClick={onBack}>
          Back to grid
        </button>
        <h2>Presets</h2>
      </div>
      <button type="button" className="create-preset-btn" onClick={onCreatePreset}>
        Create new preset
      </button>
      {names.length === 0 ? (
        <p className="preset-manager-empty">No presets yet. Create one to set card order.</p>
      ) : (
        <ul className="preset-list">
          {names.map((name) => (
            <li key={name} className="preset-item">
              <span className="preset-name">{name}</span>
              {activePreset === name && <span className="preset-badge">Active</span>}
              <div className="preset-actions">
                {activePreset !== name && (
                  <button type="button" className="secondary" onClick={() => handleSelect(name)}>
                    Select
                  </button>
                )}
                <button type="button" className="danger" onClick={() => handleDelete(name)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
