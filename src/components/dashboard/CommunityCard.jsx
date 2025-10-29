import React from 'react'

export default function CommunityCard({ community, onToggleJoin }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{community.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{community.description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{community.members} members</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">Topic: <span className="font-medium text-gray-700">{community.topic}</span></div>
        <button onClick={() => onToggleJoin(community.id)} className={`px-4 py-2 rounded-md font-semibold ${community.joined ? 'bg-gray-200 text-gray-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
          {community.joined ? 'Joined' : 'Join'}
        </button>
      </div>
    </div>
  )
}
