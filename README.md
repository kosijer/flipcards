# Biramo kaznu

A flip-card web app for revealing cards in a configurable order. Cards are shown in a grid; tapping a face-down card reveals it fullscreen. Presets define the order in which cards are revealed.

## Features

- **Card grid** – Face-down cards; tap to reveal in sequence (or re-open an already revealed card).
- **Fullscreen view** – Revealed card is shown fullscreen; close button appears after a short delay to avoid skipping through too quickly.
- **Presets** – Admin can create and select presets that define the revelation order (e.g. first tap shows card 3, second tap shows card 1, etc.).
- **PIN-protected admin** – Settings and preset management behind a PIN.

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Output is in `dist/`. Serve with any static file server, e.g.:

```bash
npm run preview
```

## Configuration

- **Card images** – Place card faces as `01.png`, `02.png`, … in `public/images/cards/`. Card back image: `public/images/card-back.png`.
- **Admin PIN** – Set in `src/config.ts` (`ADMIN_PIN`). Change before deployment.
- **Behaviour** – Fullscreen close-button delay and app title are in `src/constants.ts`. Image paths and limits are in `src/config.ts`.

## Project structure

- `src/App.tsx` – Root layout, header, view switching, PIN modal.
- `src/components/` – Card grid, Card, FullscreenCard, PresetManager, CreatePreset, PinModal.
- `src/hooks/useCardImages.ts` – Loads card image URLs (01.png, 02.png, …).
- `src/utils/presets.ts` – Preset storage (sessionStorage) and helpers.
- `src/constants.ts` – UI/behaviour constants (title, delays).
- `src/config.ts` – PIN, image paths, card count limit.

## Licence

Private / project-specific.
