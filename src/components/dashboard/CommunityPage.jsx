import React, { useEffect, useState } from 'react'
import CommunityCard from './CommunityCard'
import CommunityDetail from './CommunityDetail'
import { listCommunities, joinCommunity, leaveCommunity, getStoredAuth } from '../../services/api'

export default function CommunityPage() {
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        const res = await listCommunities()
        const data = Array.isArray(res.data) ? res.data : (res.data?.communities || [])

  console.debug('listCommunities response:', res.data)
  const normalized = data.map((c) => ({
          id: c.id || c._id || c.community_id || c.communityId,
          name: c.name || c.title || 'Community',
          description: c.description || c.summary || '',
          topic: c.topic || c.category || '',
          members: typeof c.members === 'number' ? c.members : (Array.isArray(c.members) ? c.members.length : (c.members_count || c.membersCount || 0)),
          joined: !!(c.joined || c.is_member)
        }))

  console.debug('normalized communities:', normalized)
  // Show all communities returned by the backend (do not filter by availability)
  const filtered = normalized
        if (mounted) setCommunities(filtered)
      } catch (err) {
        console.error('Failed to load communities', err)
        if (mounted) setError('Failed to load communities')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetch()

    return () => { mounted = false }
  }, [])

  const toggleJoin = async (id) => {
    // optimistic update
    setCommunities((prev) => prev.map(c => c.id === id ? { ...c, joined: !c.joined } : c))
    const { user } = getStoredAuth()
    const target = communities.find(c => c.id === id)
    const wasJoined = target?.joined
    try {
      if (wasJoined) {
        await leaveCommunity(id, user?.id)
      } else {
        await joinCommunity(id, user?.id)
      }
    } catch (err) {
      console.error('Join/leave failed', err)
      // revert
      setCommunities((prev) => prev.map(c => c.id === id ? { ...c, joined: wasJoined } : c))
    }
  }

  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const handleView = (community) => {
    setSelectedCommunity(community)
  }

  const handleCloseDetail = () => setSelectedCommunity(null)

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">Browse groups and find supportive communities. Join to participate and receive updates.</p>

      {loading ? (
        <div className="text-center py-8"><p className="text-gray-500">Loading communities...</p></div>
      ) : error ? (
        <div className="text-center py-8"><p className="text-red-500">{error}</p></div>
      ) : communities.length === 0 ? (
        <div className="text-center py-8"><p className="text-gray-500">No communities found.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {communities.map((c) => (
            <CommunityCard key={c.id} community={c} onToggleJoin={toggleJoin} onView={handleView} />
          ))}
        </div>
      )}
      {selectedCommunity && (
        <CommunityDetail community={selectedCommunity} onClose={handleCloseDetail} onToggleJoin={toggleJoin} />
      )}
      </div>
    </div>
  )
}
