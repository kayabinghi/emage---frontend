import React, { useEffect, useState } from 'react'
import {Menu, DownloadCloud } from 'lucide-react'
import Avatar from 'boring-avatars'

export default function Header({ userName, userRole, onMenuToggle }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    function onBeforeInstallPrompt(e) {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    function onAppInstalled() {
      setDeferredPrompt(null)
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    try {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      // hide the install UI regardless of choice
      setDeferredPrompt(null)
      setCanInstall(false)
      // optional: log the user's choice
      console.log('PWA install choice:', choiceResult)
    } catch (err) {
      console.error('PWA install failed', err)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* mobile menu button */}
          <button onClick={onMenuToggle} className="md:hidden p-2 rounded-lg hover:bg-gray-100"><Menu className="w-5 h-5 text-gray-600" /></button>
        </div>

        <div className="flex items-center space-x-3">
          {/* PWA install button (shows when beforeinstallprompt fires) */}
          {canInstall && (
            <button onClick={handleInstallClick} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100">
              <DownloadCloud className="w-4 h-4" />
              <span className="text-sm font-medium">Install</span>
            </button>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden">
              <Avatar size={40} name={userName || 'User'} variant="beam" colors={["#A7F3D0","#34D399","#10B981","#059669","#064E3B"]} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
