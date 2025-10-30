import React, { useEffect, useState } from 'react'
import { getCommunityMessages, getStoredAuth, addCommunityMessage } from '../../services/api'

export default function CommunityDetail({ community, onClose, onToggleJoin }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // fetch messages; exposed so we can call it after posting
  async function fetchMessages() {
    setLoading(true)
    setError(null)
    try {
      const res = await getCommunityMessages(community.id)
      const data = Array.isArray(res.data) ? res.data : (res.data?.messages || [])
      setMessages(data)
    } catch (err) {
      console.error('Failed to load messages', err)
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let mounted = true
    if (mounted) fetchMessages()
    // polling every 6 seconds for new messages
    const timer = setInterval(() => {
      fetchMessages().catch(() => {})
    }, 6000)
    return () => { mounted = false; clearInterval(timer) }
  }, [community.id])

  const [composer, setComposer] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async (e) => {
    e && e.preventDefault()
    const { user } = getStoredAuth()
    if (!user) return alert('Please login to post messages')
    if (!composer.trim()) return
    setSending(true)
    try {
      const payload = { content: composer.trim(), author_id: user.id }
      await addCommunityMessage(community.id, payload)
      setComposer('')
      await fetchMessages()
    } catch (err) {
      console.error('Failed to send message', err)
      alert(err?.response?.data?.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleToggleJoin = async () => {
    const { user } = getStoredAuth()
    if (!user) return alert('Please login to join communities')
    onToggleJoin && onToggleJoin(community.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-none sm:rounded-xl w-full h-full sm:h-auto sm:max-w-3xl p-4 sm:p-6 overflow-hidden flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">{community.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{community.description}</p>
            <p className="text-xs text-gray-500 mt-2">Topic: {community.topic} • {community.members} members</p>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
            <button onClick={handleToggleJoin} className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold ${community.joined ? 'bg-gray-200 text-gray-700' : 'bg-emerald-600 text-white'}`}>
              {community.joined ? 'Leave' : 'Join'}
            </button>
            <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200">Close</button>
          </div>
        </div>

        <div className="mt-6 flex-1 overflow-auto flex flex-col">
          <h3 className="font-semibold text-lg mb-2">Recent messages</h3>
          {loading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">No messages yet. Be the first to post!</p>
          ) : (
            <div className="space-y-3 flex-1 overflow-auto">
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

        <form onSubmit={handleSend} className="mt-4 border-t pt-4">
          <div className="flex items-start space-x-2">
            <textarea value={composer} onChange={(e) => setComposer(e.target.value)} placeholder="Write a message..." className="flex-1 px-3 py-2 border rounded-md resize-none h-20 text-sm" />
            <div className="flex flex-col space-y-2">
              <button type="submit" disabled={sending} className="px-4 py-2 bg-emerald-600 text-white rounded-md">
                {sending ? 'Sending...' : 'Send'}
              </button>
              <button type="button" onClick={() => setComposer('')} className="px-3 py-2 bg-gray-100 rounded-md text-sm">Clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
