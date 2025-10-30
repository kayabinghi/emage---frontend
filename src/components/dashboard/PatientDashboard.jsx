import React, { useState, useEffect } from 'react'
import { Heart, Book, MessageSquare, TrendingUp } from 'lucide-react'
import CommunityPage from './CommunityPage'
import TherapistsPage from './TherapistsPage'
import MoodModal from './MoodModal'
import JournalModal from './JournalModal' // Import the JournalModal
import { getMood, getStoredAuth, getJournals, addJournal } from '../../services/api' // Import journal APIs

export default function PatientDashboard({ activeTab, onOpenJournal }) {
  const [moodEntries, setMoodEntries] = useState([])
  const [journalEntries, setJournalEntries] = useState([])
  const [showMoodModal, setShowMoodModal] = useState(false)
  const [showJournalModal, setShowJournalModal] = useState(false) // Add journal modal state
  const [loading, setLoading] = useState(true)
  const [journalLoading, setJournalLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const { user } = getStoredAuth()
    if (user) {
      setCurrentUser(user)
      loadMoodData(user.id)
      loadJournalData() // Load journals when component mounts
    } else {
      setLoading(false)
    }
  }, [])

  const loadMoodData = async (userId) => {
    try {
      setLoading(true)
      const response = await getMood(userId)
      
      const formattedMoods = response.data.moods.map(mood => ({
        id: mood.id,
        emoji: getMoodEmoji(mood.emotion_label),
        mood: mood.emotion_label,
        date: new Date(mood.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date(mood.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        created_at: mood.created_at
      }))
      
      setMoodEntries(formattedMoods)
    } catch (error) {
      console.error('Error loading mood data:', error)
      if (error.response?.status !== 404) {
        showNotification('Failed to load mood history', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  const loadJournalData = async () => {
    try {
      setJournalLoading(true)
      const response = await getJournals()
      setJournalEntries(response.data)
    } catch (error) {
      console.error('Error loading journals:', error)
      showNotification('Failed to load journal entries', 'error')
    } finally {
      setJournalLoading(false)
    }
  }

  const getMoodEmoji = (mood) => {
    const emojiMap = { 'Happy': '😊', 'Calm': '😌', 'Sad': '😔', 'Anxious': '😰', 'Angry': '😤', 'Tired': '😴' }
    return emojiMap[mood] || '😐'
  }

  const handleMoodSaved = (newEntry) => {
    setMoodEntries(prev => [newEntry, ...prev])
    showNotification(newEntry.message || 'Mood saved successfully!', 'success')
  }

  const handleJournalSaved = async (journalData) => {
    try {
      await addJournal(journalData)
      setShowJournalModal(false)
      loadJournalData() // Refresh the journal list
      showNotification('Journal entry saved successfully!', 'success')
    } catch (error) {
      console.error('Error saving journal:', error)
      showNotification('Failed to save journal entry', 'error')
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleOpenMood = () => {
    if (!currentUser) {
      showNotification('Please log in to track your mood', 'error')
      return
    }
    setShowMoodModal(true)
  }

  const handleOpenJournal = () => {
    if (!currentUser) {
      showNotification('Please log in to write journal entries', 'error')
      return
    }
    setShowJournalModal(true)
  }

  if (!currentUser) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please log in to access your dashboard.</p>
      </div>
    )
  }

  const StatCard = ({ icon: Icon, value, label, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <span className="text-sm font-semibold text-emerald-600">{trend}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  )

  const MoodEntry = ({ entry }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="text-3xl">{entry.emoji}</div>
        <div>
          <p className="font-semibold text-gray-900">{entry.mood}</p>
          <p className="text-xs text-gray-500">{entry.date} at {entry.time}</p>
        </div>
      </div>
    </div>
  )

  const JournalEntry = ({ entry }) => (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{entry.title}</h4>
            <p className="text-sm text-gray-500">{entry.created_at}</p>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
          {entry.is_private && (
            <div className="mt-2">
              <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                Private
              </span>
            </div>
          )}
        </div>
      )
  const stats = [
    { icon: Heart, value: moodEntries.length, label: 'Mood Check-ins', trend: moodEntries.length > 0 ? '+12%' : '—' },
    { icon: Book, value: journalEntries.length, label: 'Journal Entries', trend: journalEntries.length > 0 ? `+${journalEntries.length}` : '—' },
    { icon: MessageSquare, value: 3, label: 'Groups Joined', trend: '—' },
    { icon: TrendingUp, value: `${calculateWellnessScore(moodEntries)}%`, label: 'Wellness Score', trend: moodEntries.length > 3 ? '+5%' : '—' }
  ]

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentUser.username}! 👋</h1>
      <p className="text-gray-600 mb-8">Your emotional wellness overview</p>

      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
          notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
        } text-white`}>
          <p>{notification.message}</p>
        </div>
      )}

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white mb-8">
            <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
            <div className="flex space-x-4">
              <button 
                onClick={handleOpenMood} 
                className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition" 
                style={{backgroundColor: '#FF7A59'}}
              >
                Log Mood
              </button>
              <button 
                onClick={handleOpenJournal} 
                className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Write Journal
              </button>
            </div>
          </div>

          {moodEntries.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Moods</h3>
              <div className="space-y-3">
                {moodEntries.slice(0, 3).map((entry) => (
                  <MoodEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          )}

          {journalEntries.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Journal Entries</h3>
              <div className="space-y-4">
                {journalEntries.slice(0, 2).map((entry) => (
                  <JournalEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'mood' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Mood Tracking</h3>
            <button 
              onClick={handleOpenMood} 
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              + Add Mood
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading mood history...</p>
            </div>
          ) : moodEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No mood entries yet. Start tracking your mood!</p>
              <button 
                onClick={handleOpenMood}
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Add your first mood entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {moodEntries.map((entry) => (
                <MoodEntry key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">My Journal</h3>
            <button 
              onClick={handleOpenJournal} 
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              + New Entry
            </button>
          </div>
          
          {journalLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading journal entries...</p>
            </div>
          ) : journalEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No journal entries yet. Start writing!</p>
              <button 
                onClick={handleOpenJournal}
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Write your first entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <JournalEntry key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'community' && <CommunityPage />}
      {activeTab === 'therapists' && <TherapistsPage />}

      {showMoodModal && (
        <MoodModal
          onClose={() => setShowMoodModal(false)}
          onSave={handleMoodSaved}
          userId={currentUser.id}
        />
      )}

      {showJournalModal && (
        <JournalModal
          onClose={() => setShowJournalModal(false)}
          onSave={handleJournalSaved}
          currentUser={currentUser}
        />
      )}
    </div>
  )
}

function calculateWellnessScore(moods) {
  if (!moods.length) return 0
  
  const scores = { 'Happy': 100, 'Calm': 90, 'Tired': 60, 'Anxious': 40, 'Sad': 30, 'Angry': 20 }
  const recent = moods.slice(0, 7)
  
  const average = recent.reduce((sum, mood) => sum + (scores[mood.mood] || 50), 0) / recent.length
  return Math.round(average)
}