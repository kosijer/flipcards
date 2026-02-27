import { useState, useEffect } from 'react'
import { CardGrid } from './components/CardGrid'
import { PinModal } from './components/PinModal'
import { PresetManager } from './components/PresetManager'
import { CreatePreset } from './components/CreatePreset'
import { APP_TITLE } from './constants'

type View = 'grid' | 'admin' | 'create-preset'

function App() {
  const [view, setView] = useState<View>('grid')
  const [showPinModal, setShowPinModal] = useState(false)
  const [adminUnlocked, setAdminUnlocked] = useState(false)

  const openAdmin = () => setShowPinModal(true)

  const handlePinSuccess = () => {
    setShowPinModal(false)
    setAdminUnlocked(true)
    setView('admin')
  }

  const handleBackToGrid = () => {
    setView('grid')
    setAdminUnlocked(false)
  }

  const handleCreatePreset = () => setView('create-preset')
  const handleBackToAdmin = () => setView('admin')

  useEffect(() => {
    document.title = APP_TITLE
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>{APP_TITLE}</h1>
        <button
          type="button"
          className="header-admin-btn header-admin-btn-icon"
          onClick={openAdmin}
          aria-label="Admin"
        >
          <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="currentColor" focusable="false">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>
      </header>
      <main className="app-main">
        {view === 'grid' && <CardGrid />}
        {view === 'admin' && adminUnlocked && (
          <PresetManager
            onBack={handleBackToGrid}
            onCreatePreset={handleCreatePreset}
          />
        )}
        {view === 'create-preset' && adminUnlocked && (
          <CreatePreset onBack={handleBackToAdmin} />
        )}
      </main>

      {showPinModal && (
        <PinModal
          onSuccess={handlePinSuccess}
          onClose={() => setShowPinModal(false)}
        />
      )}
    </div>
  )
}

export default App
