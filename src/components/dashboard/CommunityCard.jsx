import React from 'react'

export default function CommunityCard({ community, onToggleJoin, onView }) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900">{community.name}</h4>
          <p className="text-sm text-gray-600 mt-2 sm:mt-1">{community.description}</p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 text-right">
          <p className="text-sm text-gray-500">{community.members} members</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500 mb-3 sm:mb-0">Topic: <span className="font-medium text-gray-700">{community.topic}</span></div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:space-x-2 w-full sm:w-auto">
          <button onClick={() => onView && onView(community)} className="w-full sm:w-auto px-3 py-2 rounded-md font-medium text-sm bg-gray-100 text-gray-800 hover:bg-gray-200">View</button>
          <button onClick={() => onToggleJoin(community.id)} className={`w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 rounded-md font-semibold ${community.joined ? 'bg-gray-200 text-gray-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
            {community.joined ? 'Joined' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  )
}
