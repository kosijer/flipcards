import { useState, useEffect } from 'react'
import { CARDS_IMAGE_PATH, CARD_BACK_IMAGE_PATH, MAX_CARD_NUMBER } from '../config'

/** Base URL for assets (respects Vite base, e.g. /flipcards/ on GitHub Pages) */
function assetUrl(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${base}/${p}`.replace(/\/+/g, '/')
}

/**
 * Discover card images by trying 01.png, 02.png, ... until one fails or MAX_CARD_NUMBER.
 * Returns list of image URLs (1-based index maps to position in array: index 0 = card 1).
 */
export function useCardImages(): { cardUrls: string[]; cardBackUrl: string; loading: boolean } {
  const [cardUrls, setCardUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const base = assetUrl(CARDS_IMAGE_PATH.replace(/\/$/, '') + '/')
  const cardBackUrl = assetUrl(CARD_BACK_IMAGE_PATH)

  useEffect(() => {
    let cancelled = false
    const urls: string[] = []

    const tryNext = (n: number) => {
      if (cancelled || n > MAX_CARD_NUMBER) {
        if (!cancelled) setCardUrls(urls)
        setLoading(false)
        return
      }
      const filename = `${String(n).padStart(2, '0')}.png`
      const url = base + filename
      const img = new Image()
      img.onload = () => {
        urls.push(url)
        tryNext(n + 1)
      }
      img.onerror = () => {
        setCardUrls(urls)
        setLoading(false)
      }
      img.src = url
    }

    tryNext(1)
    return () => {
      cancelled = true
    }
  }, [base])

  return { cardUrls, cardBackUrl, loading }
}
