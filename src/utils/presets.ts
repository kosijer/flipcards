import type { PresetStorage, PresetsMap, PresetOrder } from '../types'
import { PRESET_STORAGE_KEY } from '../types'

function getStorage(): PresetStorage {
  try {
    const raw = sessionStorage.getItem(PRESET_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as PresetStorage
      if (parsed.presets && typeof parsed.presets === 'object') {
        return {
          presets: parsed.presets,
          activePreset: parsed.activePreset ?? null,
        }
      }
    }
  } catch {
    // ignore
  }
  return { presets: {}, activePreset: null }
}

function saveStorage(data: PresetStorage): void {
  sessionStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(data))
}

export function getPresets(): PresetsMap {
  return getStorage().presets
}

export function getActivePreset(): string | null {
  return getStorage().activePreset
}

export function setActivePreset(name: string | null): void {
  const s = getStorage()
  s.activePreset = name
  saveStorage(s)
}

export function addPreset(name: string, order: PresetOrder): void {
  const s = getStorage()
  s.presets[name] = order
  saveStorage(s)
}

export function deletePreset(name: string): void {
  const s = getStorage()
  delete s.presets[name]
  if (s.activePreset === name) s.activePreset = null
  saveStorage(s)
}

export function savePresets(presets: PresetsMap): void {
  const s = getStorage()
  s.presets = presets
  saveStorage(s)
}
