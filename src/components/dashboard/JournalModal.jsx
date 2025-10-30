import React, { useState } from 'react'

export default function JournalModal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSave = () => {
    if (!title || !content) return
    const entry = {
      title,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    onSave(entry)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Journal Entry</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give your entry a title..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your thoughts..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows="8" />
        </div>

        <div className="flex space-x-3">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={!title || !content} className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed">Save Entry</button>
        </div>
      </div>
    </div>
  )
}
