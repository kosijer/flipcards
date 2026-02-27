/**
 * App configuration: PIN, image paths, limits.
 */

export const ADMIN_PIN = '1702'

/** Base path for card images (relative to public or absolute). Default: /images/cards/ */
export const CARDS_IMAGE_PATH =
  (import.meta.env.VITE_CARDS_PATH as string) || '/images/cards/'

/** Path to the single card-back image */
export const CARD_BACK_IMAGE_PATH = '/images/card-back.png'

/** Max card number to try when discovering images (01.png … 99.png) */
export const MAX_CARD_NUMBER = 99
