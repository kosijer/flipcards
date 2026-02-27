import { motion } from 'framer-motion'

interface CardProps {
  /** 1-based card index (which image: 1 = 01.png) */
  cardIndex: number
  frontImageUrl: string
  backImageUrl: string
  /** When true, show front (face up); when false, show back (face down) */
  isFlipped?: boolean
  onClick: () => void
  className?: string
}

export function Card({
  cardIndex,
  frontImageUrl,
  backImageUrl,
  isFlipped = false,
  onClick,
  className = '',
}: CardProps) {
  return (
    <motion.button
      type="button"
      className={`card ${className} ${isFlipped ? 'card-flipped' : ''}`}
      onClick={onClick}
      initial={false}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card-inner">
        <div className="card-face card-back">
          <img src={backImageUrl} alt="" />
        </div>
        <div className="card-face card-front">
          <img src={frontImageUrl} alt={`Card ${cardIndex}`} />
        </div>
      </div>
    </motion.button>
  )
}
