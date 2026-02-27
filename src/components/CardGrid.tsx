import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useCardImages } from '../hooks/useCardImages'
import { getActivePreset, getPresets } from '../utils/presets'
import { LOADING_CARDS_MESSAGE } from '../constants'
import { Card } from './Card'
import { FullscreenCard } from './FullscreenCard'

export function CardGrid() {
  const { cardUrls, cardBackUrl, loading } = useCardImages()
  const count = cardUrls.length

  /** Preset defines the *order of revelation*: first tap shows preset[0], second tap shows preset[1], etc. */
  const presetOrder = useMemo(() => {
    const active = getActivePreset()
    const presets = getPresets()
    const order = active && presets[active] ? presets[active] : null
    if (order && order.length === count) return order
    return Array.from({ length: count }, (_, i) => i + 1)
  }, [count])

  /** For each grid position, which card image (1-based) is revealed there, or null if still face down */
  const [revealedByPosition, setRevealedByPosition] = useState<(number | null)[]>(() =>
    Array.from({ length: count }, () => null)
  )
  /** Index into presetOrder for the next revelation */
  const [nextRevealIndex, setNextRevealIndex] = useState(0)
  const [fullscreenCard, setFullscreenCard] = useState<{
    cardIndex: number
    frontImageUrl: string
  } | null>(null)
  const [pendingRevealPosition, setPendingRevealPosition] = useState<number | null>(null)

  const openCard = (position: number) => {
    const alreadyRevealed = revealedByPosition[position] ?? null
    if (alreadyRevealed !== null) {
      // Re-open same card in fullscreen (view again), don't advance preset
      const frontImageUrl = cardUrls[alreadyRevealed - 1]
      if (frontImageUrl) {
        setPendingRevealPosition(null)
        setFullscreenCard({ cardIndex: alreadyRevealed, frontImageUrl })
      }
      return
    }
    if (nextRevealIndex >= presetOrder.length) return
    const cardIndex = presetOrder[nextRevealIndex]
    const frontImageUrl = cardUrls[cardIndex - 1]
    if (!frontImageUrl) return
    setPendingRevealPosition(position)
    setFullscreenCard({ cardIndex, frontImageUrl })
  }

  const handleCloseFullscreen = () => {
    if (pendingRevealPosition !== null) {
      const cardIndex = fullscreenCard?.cardIndex
      if (cardIndex !== undefined) {
        setRevealedByPosition((prev) => {
          const next = [...prev]
          while (next.length <= pendingRevealPosition) next.push(null)
          next[pendingRevealPosition] = cardIndex
          return next
        })
        setNextRevealIndex((prev) => prev + 1)
      }
      setPendingRevealPosition(null)
    }
    setFullscreenCard(null)
  }

  if (loading) {
    return (
      <div className="card-grid-loading">
        <p>{LOADING_CARDS_MESSAGE}</p>
      </div>
    )
  }

  if (count === 0) {
    return (
      <div className="card-grid-loading">
        <p>No card images found. Add 01.png, 02.png, … to the images folder.</p>
      </div>
    )
  }

  return (
    <>
      <div className="card-grid">
        {Array.from({ length: count }, (_, position) => {
          const revealedCardIndex = revealedByPosition[position] ?? null
          const frontImageUrl = revealedCardIndex !== null ? cardUrls[revealedCardIndex - 1] : ''
          return (
            <Card
              key={position}
              cardIndex={revealedCardIndex ?? position + 1}
              frontImageUrl={frontImageUrl || cardBackUrl}
              backImageUrl={cardBackUrl}
              isFlipped={revealedCardIndex !== null}
              onClick={() => openCard(position)}
            />
          )
        })}
      </div>

      <AnimatePresence>
        {fullscreenCard && (
          <FullscreenCard
            key="fullscreen"
            frontImageUrl={fullscreenCard.frontImageUrl}
            cardIndex={fullscreenCard.cardIndex}
            onClose={handleCloseFullscreen}
          />
        )}
      </AnimatePresence>
    </>
  )
}
