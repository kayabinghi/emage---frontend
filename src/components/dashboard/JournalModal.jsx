import React, { useState } from 'react'

export default function JournalModal({ onClose, onSave, currentUser }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!title || !content) return
    
    setLoading(true)
    try {
      // Format data to match Flask backend expectations
      const entry = {
        title: title,
        content: content,
        user_id: currentUser?.id || 1, // Use actual user ID from props
        is_private: isPrivate,
      }
      
      await onSave(entry)
    } catch (error) {
      console.error('Error saving journal:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Journal Entry</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Give your entry a title..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write your thoughts..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            rows="8" 
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={isPrivate} 
              onChange={(e) => setIsPrivate(e.target.checked)} 
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mr-2" 
            />
            <span className="text-sm text-gray-700">Keep this entry private</span>
          </label>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={!title || !content || loading}
            className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Entry'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}