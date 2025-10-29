import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MoodModal from './MoodModal'
import JournalModal from './JournalModal'
import CommunityPage from './CommunityPage'
import TherapistsPage from './TherapistsPage'
import AdminDashboard from './AdminDashboard'
import PatientDashboard from './PatientDashboard'
import TherapistDashboard from './TherapistDashboard'

export default function Dashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [moodEntries, setMoodEntries] = useState([])
  const [journalEntries, setJournalEntries] = useState([])
  const [showMoodModal, setShowMoodModal] = useState(false)
  const [showJournalModal, setShowJournalModal] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  
  useEffect(() => {
    if (!user) {
      if (onLogout) onLogout()
    }
  }, [user, onLogout])

  const userRole = user?.role
  const userName = user?.username || user?.name || 'User Name'

  const renderMain = () => {
    if (activeTab === 'logout') {
      return (
        <div className="p-8 max-w-md mx-auto mt-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Logout</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to logout?</p>
            <button onClick={onLogout} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold">Confirm Logout</button>
          </div>
        </div>
      )
    }

    if (userRole === 'admin') return <AdminDashboard />
    if (userRole === 'therapist') return <TherapistDashboard />

    // default: regular patient/user view
    return (
      <PatientDashboard
        activeTab={activeTab}
        moodEntries={moodEntries}
        journalEntries={journalEntries}
        onOpenMood={() => setShowMoodModal(true)}
        onOpenJournal={() => setShowJournalModal(true)}
      />
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header userName={userName} userRole={userRole} onMenuToggle={() => setMobileSidebarOpen(v => !v)} />
        <div className="flex-1 overflow-auto">
          {renderMain()}

          {/* Modals live in the parent so state is preserved across role switches */}
          {showMoodModal && (
            <MoodModal
              onClose={() => setShowMoodModal(false)}
              onSave={(mood) => { setMoodEntries([...moodEntries, mood]); setShowMoodModal(false); }}
            />
          )}

          {showJournalModal && (
            <JournalModal
              onClose={() => setShowJournalModal(false)}
              onSave={(entry) => { setJournalEntries([...journalEntries, entry]); setShowJournalModal(false); }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
