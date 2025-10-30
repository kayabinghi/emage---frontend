import React, { useState } from 'react'
import { createCommunity, getStoredAuth } from '../../services/api'

export default function CreateCommunityForm({ onCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name) return setError('Name is required')
    setLoading(true)
    try {
      const { user } = getStoredAuth()
      if (!user) return setError('Please login to create a community')
      const payload = {
        name,
        description,
        topic,
        is_private: !!isPrivate,
        owner_id: user.id
      }
      await createCommunity(payload)
      setName('')
      setDescription('')
      setTopic('')
      setIsPrivate(false)
      onCreated && onCreated()
    } catch (err) {
      console.error('Create community failed', err)
      setError(err?.response?.data?.message || 'Failed to create community')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="New community name" className="px-3 py-2 border rounded-md text-sm w-40 sm:w-56" />
      <button type="submit" disabled={loading} className="px-3 py-2 bg-emerald-600 text-black rounded-md text-sm hover:bg-emerald-700">
        {loading ? 'Creating...' : 'Create'}
      </button>
      <div className="ml-2 text-sm">
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </form>
  )
}
