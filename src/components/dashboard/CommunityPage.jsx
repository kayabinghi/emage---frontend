import React, { useState } from 'react'
import CommunityCard from './CommunityCard'

const initialCommunities = [
  { id: 'c1', name: 'Anxiety Support', description: 'Safe space to share experiences about anxiety and coping skills.', topic: 'Anxiety', members: 124, joined: false },
  { id: 'c2', name: 'Mindfulness & Meditation', description: 'Guided tips and group meditations for beginners.', topic: 'Mindfulness', members: 89, joined: true },
  { id: 'c3', name: 'Depression Peer Support', description: 'Peer-led discussions, resources and check-ins.', topic: 'Depression', members: 203, joined: false }
]

export default function CommunityPage() {
  const [communities, setCommunities] = useState(initialCommunities)

  const toggleJoin = (id) => {
    setCommunities((prev) => prev.map(c => c.id === id ? { ...c, joined: !c.joined } : c))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
      <p className="text-gray-600 mb-6">Browse groups and find supportive communities. Join to participate and receive updates.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {communities.map((c) => (
          <CommunityCard key={c.id} community={c} onToggleJoin={toggleJoin} />
        ))}
      </div>
    </div>
  )
}
