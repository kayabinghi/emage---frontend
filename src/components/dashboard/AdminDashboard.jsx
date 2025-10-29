import React from 'react'
import { Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center"><Users className="w-6 h-6 text-emerald-600" /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,248</p>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center"><Users className="w-6 h-6 text-emerald-600" /></div>
            <span className="text-sm font-semibold" style={{color: '#FF7A59'}}>5 pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">32</p>
          <p className="text-sm text-gray-600">Therapists</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center"><TrendingUp className="w-6 h-6 text-emerald-600" /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">92%</p>
          <p className="text-sm text-gray-600">System Health</p>
        </div>
      </div>
    </div>
  )
}