/**
 * Preset = display order of cards by 1-based index.
 * e.g. [1, 5, 2, 9, 3, 4, 8, 6, 7]
 */
export type PresetOrder = number[]

export type PresetsMap = Record<string, PresetOrder>

export interface PresetStorage {
  presets: PresetsMap
  activePreset: string | null
}

export const PRESET_STORAGE_KEY = 'flipcards-presets'
