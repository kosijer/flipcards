import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FULLSCREEN_CLOSE_BUTTON_DELAY_MS } from '../constants'

interface FullscreenCardProps {
  frontImageUrl: string
  cardIndex: number
  onClose: () => void
}

export function FullscreenCard({ frontImageUrl, cardIndex, onClose }: FullscreenCardProps) {
  const [showCloseButton, setShowCloseButton] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowCloseButton(true)
    }, FULLSCREEN_CLOSE_BUTTON_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="fullscreen-card-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => showCloseButton && e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="fullscreen-card-content"
        initial={{ scale: 0.3, rotateY: 180, opacity: 0.8 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.3, rotateY: -180, opacity: 0.8 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={frontImageUrl} alt={`Card ${cardIndex}`} />
      </motion.div>
      {showCloseButton && (
        <motion.button
          type="button"
          className="fullscreen-card-close"
          aria-label="Close"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          ×
        </motion.button>
      )}
    </motion.div>
  )
}
