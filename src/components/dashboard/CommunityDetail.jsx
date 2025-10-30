import React, { useEffect, useState } from 'react'
import { getCommunityMessages, getStoredAuth } from '../../services/api'

export default function CommunityDetail({ community, onClose, onToggleJoin }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchMessages() {
      setLoading(true)
      setError(null)
      try {
        const res = await getCommunityMessages(community.id)
        const data = Array.isArray(res.data) ? res.data : (res.data?.messages || [])
        if (mounted) setMessages(data)
      } catch (err) {
        console.error('Failed to load messages', err)
        if (mounted) setError('Failed to load messages')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchMessages()
    return () => { mounted = false }
  }, [community.id])

  const handleToggleJoin = async () => {
    const { user } = getStoredAuth()
    if (!user) return alert('Please login to join communities')
    onToggleJoin && onToggleJoin(community.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{community.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{community.description}</p>
            <p className="text-xs text-gray-500 mt-2">Topic: {community.topic} • {community.members} members</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={handleToggleJoin} className={`px-4 py-2 rounded-md font-semibold ${community.joined ? 'bg-gray-200 text-gray-700' : 'bg-emerald-600 text-white'}`}>
              {community.joined ? 'Leave' : 'Join'}
            </button>
            <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200">Close</button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Recent messages</h3>
          {loading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">No messages yet. Be the first to post!</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-auto">
              {messages.map((m) => (
                <div key={m.id || m.message_id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{m.author_name || m.author || 'Member'}</p>
                    <p className="text-xs text-gray-500">{m.created_at ? new Date(m.created_at).toLocaleString() : ''}</p>
                  </div>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">{m.content || m.message || ''}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
