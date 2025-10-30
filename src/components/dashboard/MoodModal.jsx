import React, { useState } from 'react'

export default function MoodModal({ onClose, onSave }) {
  const [selectedMood, setSelectedMood] = useState(null)

  const moods = [
    { emoji: '😊', mood: 'Happy' },
    { emoji: '😌', mood: 'Calm' },
    { emoji: '😔', mood: 'Sad' },
    { emoji: '😰', mood: 'Anxious' },
    { emoji: '😤', mood: 'Angry' },
    { emoji: '😴', mood: 'Tired' },
  ]

  const handleSave = () => {
    if (!selectedMood) return
    const entry = {
      ...selectedMood,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    onSave(entry)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling?</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {moods.map((mood) => (
            <button key={mood.mood} onClick={() => setSelectedMood(mood)} className={`p-4 rounded-lg border-2 transition ${selectedMood?.mood === mood.mood ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <p className="text-sm font-semibold text-gray-900">{mood.mood}</p>
            </button>
          ))}
        </div>
        
        <div className="flex space-x-3">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={!selectedMood} className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed">Save Mood</button>
        </div>
      </div>
    </div>
  )
}
