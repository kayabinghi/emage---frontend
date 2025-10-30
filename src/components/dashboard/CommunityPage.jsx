import React, { useEffect, useState } from 'react'
import CommunityCard from './CommunityCard'
import CommunityDetail from './CommunityDetail'
import CreateCommunityForm from './CreateCommunityForm'
import { listCommunities, joinCommunity, leaveCommunity, getStoredAuth } from '../../services/api'

export default function CommunityPage() {
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // fetch function exposed so child components can refresh the list
  async function fetchCommunities() {
    setLoading(true)
    setError(null)
    try {
      const res = await listCommunities()
      const data = Array.isArray(res.data) ? res.data : (res.data?.communities || [])
      console.debug('listCommunities response:', res.data)
      const { user } = getStoredAuth()
      const userId = user?.id ?? user?.user_id ?? user?.userId ?? null

      const normalized = data.map((c) => {
        const id = c.id || c._id || c.community_id || c.communityId
        const name = c.name || c.title || 'Community'
        const description = c.description || c.summary || ''
        const topic = c.topic || c.category || ''

        // determine members count
        let membersCount = 0
        if (typeof c.members === 'number') membersCount = c.members
        else if (Array.isArray(c.members)) membersCount = c.members.length
        else if (Array.isArray(c.members_ids)) membersCount = c.members_ids.length
        else membersCount = c.members_count || c.membersCount || 0

        // robust joined detection: check explicit flags, or membership arrays for current user
        let joined = !!(c.joined || c.is_member)
        if (!joined && userId) {
          if (Array.isArray(c.members)) {
            // members may be array of ids or user objects
            if (c.members.length > 0 && typeof c.members[0] === 'object') {
              joined = c.members.some(m => m && (String(m.id) === String(userId) || String(m.user_id) === String(userId) || String(m.userId) === String(userId)))
            } else {
              joined = c.members.some(mid => String(mid) === String(userId))
            }
          } else if (Array.isArray(c.members_ids)) {
            joined = c.members_ids.some(mid => String(mid) === String(userId))
          } else if (c.member_ids && Array.isArray(c.member_ids)) {
            joined = c.member_ids.some(mid => String(mid) === String(userId))
          }
        }

        return { id, name, description, topic, members: membersCount, joined }
      })

      console.debug('normalized communities:', normalized)
      setCommunities(normalized)
    } catch (err) {
      console.error('Failed to load communities', err)
      setError('Failed to load communities')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    // load on mount
    if (mounted) fetchCommunities()
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
      // surface server error message if available
      const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message
      alert(`Failed to join/leave: ${typeof serverMsg === 'object' ? JSON.stringify(serverMsg) : serverMsg}`)
      // revert
      setCommunities((prev) => prev.map(c => c.id === id ? { ...c, joined: wasJoined } : c))
    }
    // refresh list to get latest counts/state
    fetchCommunities()
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

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="mb-4 sm:mb-0">
          <CreateCommunityForm onCreated={() => fetchCommunities()} />
        </div>
      </div>

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
