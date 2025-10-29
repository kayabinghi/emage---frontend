import React from 'react'
import { Users, Calendar, MessageSquare, Clock } from 'lucide-react'

export default function TherapistDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Therapist Dashboard</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4"><Users className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-600">Active Patients</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4"><Calendar className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-600">Today's Sessions</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4"><MessageSquare className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-600">Messages</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600">Pending Requests</p>
        </div>
      </div>
    </div>
  )
}
