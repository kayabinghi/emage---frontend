import React, { useState } from 'react'
import { addMood } from '../../services/api'

export default function MoodModal({ onClose, onSave, userId }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const moods = [
    { emoji: '😊', mood: 'Happy' },
    { emoji: '😌', mood: 'Calm' },
    { emoji: '😔', mood: 'Sad' },
    { emoji: '😰', mood: 'Anxious' },
    { emoji: '😤', mood: 'Angry' },
    { emoji: '😴', mood: 'Tired' },
  ]

  const handleSave = async () => {
    if (!selectedMood || !userId) return
    
    setIsSubmitting(true)
    setError(null)

    try {
      // Call the backend API
      const response = await addMood(userId, selectedMood.mood)
      
      // Create entry with backend response data
      const entry = {
        id: response.data.id,
        emoji: selectedMood.emoji,
        mood: response.data.emotion_label,
        message: response.data.message,
        date: new Date(response.data.created_at).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        time: new Date(response.data.created_at).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        created_at: response.data.created_at
      }
      
      // Pass the entry to parent component
      onSave(entry)
      onClose()
    } catch (err) {
      console.error('Error saving mood:', err)
      setError(err.response?.data?.message || 'Failed to save mood. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling?</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          {moods.map((mood) => (
            <button 
              key={mood.mood} 
              onClick={() => setSelectedMood(mood)} 
              disabled={isSubmitting}
              className={`p-4 rounded-lg border-2 transition ${
                selectedMood?.mood === mood.mood 
                  ? 'border-emerald-600 bg-emerald-50' 
                  : 'border-gray-200 hover:border-emerald-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <p className="text-sm font-semibold text-gray-900">{mood.mood}</p>
            </button>
          ))}
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={!selectedMood || isSubmitting}
            className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Mood'}
          </button>
        </div>
      </div>
    </div>
  )
}