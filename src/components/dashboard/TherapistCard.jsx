import React, { useState } from 'react'

export default function TherapistCard({ therapist }) {
  const [connected, setConnected] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const handleConnect = () => {
    setConnected(true)
  }

  const handleSend = () => {
    // In a real app we'd call API. For now just simulate.
    console.log('Send message to', therapist.name, message)
    setMessage('')
    setShowMessage(false)
    alert('Message sent (simulated)')
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{therapist.name}</h4>
          <p className="text-sm text-gray-600">{therapist.specialty}</p>
          <p className="text-xs text-gray-500 mt-1">{therapist.location} • {therapist.years} yrs experience</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <button onClick={handleConnect} disabled={connected} className={`px-4 py-2 rounded-md font-semibold ${connected ? 'bg-gray-200 text-gray-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
            {connected ? 'Connected' : 'Connect'}
          </button>
          <button onClick={() => setShowMessage(s => !s)} className="px-4 py-2 rounded-md border border-gray-200 text-gray-700">Message</button>
        </div>
      </div>

      {showMessage && (
        <div className="mt-4">
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-md p-2 text-sm" placeholder="Write a short message..." />
          <div className="mt-2 flex justify-end">
            <button onClick={() => setShowMessage(false)} className="px-4 py-2 mr-2 rounded-md text-sm border border-gray-200">Cancel</button>
            <button onClick={handleSend} className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
