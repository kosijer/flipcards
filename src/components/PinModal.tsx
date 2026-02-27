import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ADMIN_PIN } from '../config'

interface PinModalProps {
  onSuccess: () => void
  onClose: () => void
}

export function PinModal({ onSuccess, onClose }: PinModalProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError('')
      if (pin === ADMIN_PIN) {
        onSuccess()
      } else {
        setError('Wrong PIN')
      }
    },
    [pin, onSuccess]
  )

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="modal-content pin-modal"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Admin PIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6}
            autoFocus
          />
          {error && <p className="modal-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Enter</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
