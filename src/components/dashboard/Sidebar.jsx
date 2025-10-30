import React from 'react'
import { Heart, Home, Calendar, Users, MessageSquare, LogOut, Activity } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab, userRole, mobileOpen, onClose }) {
  const getNavItems = () => {
    if (userRole === 'admin') return [ { id: 'overview', icon: Home, label: 'Dashboard' }, { id: 'therapists', icon: Users, label: 'Manage Therapists' }, { id: 'users', icon: Users, label: 'Manage Users' } ]
    if (userRole === 'therapist') return [ { id: 'overview', icon: Home, label: 'Dashboard' }, { id: 'patients', icon: Users, label: 'My Patients' }, { id: 'consultations', icon: Calendar, label: 'Consultations' }, { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 5 } ]
    return [ { id: 'overview', icon: Home, label: 'Overview' }, { id: 'mood', icon: Heart, label: 'Mood Tracking' }, { id: 'journal', icon: Home, label: 'Journal' }, { id: 'community', icon: MessageSquare, label: 'Community', badge: 3 }, { id: 'therapists', icon: Users, label: 'Find Therapist' } ]
  }

  const navItems = getNavItems()

  return (
    // Desktop sidebar hidden on small screens; mobile overlay when mobileOpen
    <>
      <div className="hidden md:flex w-64 bg-white min-h-screen border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center"><Heart className="w-6 h-6 text-white" /></div>
          <div>
            <span className="text-xl font-bold text-gray-900">EMAGE</span>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-3"><Icon className="w-5 h-5" /><span className="font-medium text-sm">{item.label}</span></div>
                {item.badge && (<span className="text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{backgroundColor: '#FF7A59'}}>{item.badge}</span>)}
              </button>
            )
          })}
        </nav>

        <div className="mt-8 px-3">
          <button onClick={() => setActiveTab('logout')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50"><LogOut className="w-5 h-5" /><span className="font-medium text-sm">Logout</span></button>
        </div>
      </div>

      <div className="p-4 m-4 bg-emerald-600 rounded-xl text-white">
        <div className="flex items-center space-x-2"><Activity className="w-5 h-5" /><div><p className="text-xs font-semibold">Emergency:</p><p className="text-sm font-bold">+254 123 4567</p></div></div>
      </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 p-4 overflow-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center"><Heart className="w-6 h-6 text-white" /></div>
                <div>
                  <span className="text-xl font-bold text-gray-900">EMAGE</span>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
              </div>
            </div>

            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); onClose(); }} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <div className="flex items-center space-x-3"><Icon className="w-5 h-5" /><span className="font-medium text-sm">{item.label}</span></div>
                    {item.badge && (<span className="text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{backgroundColor: '#FF7A59'}}>{item.badge}</span>)}
                  </button>
                )
              })}
            </nav>

            <div className="mt-6 px-2">
              <button onClick={() => { setActiveTab('logout'); onClose(); }} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50"><LogOut className="w-5 h-5" /><span className="font-medium text-sm">Logout</span></button>
            </div>

            <div className="p-4 m-4 bg-emerald-600 rounded-xl text-white">
              <div className="flex items-center space-x-2"><Activity className="w-5 h-5" /><div><p className="text-xs font-semibold">Emergency:</p><p className="text-sm font-bold">+254 123 4567</p></div></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
