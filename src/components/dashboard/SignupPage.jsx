import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { registerUser, persistAuth } from '../services/api'

export default function SignupPage({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient', specialty: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setError('')
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    if (formData.role === 'therapist' && !formData.specialty) {
      setError('Please enter your specialty')
      return
    }

    setLoading(true)
    try {
      // Log so we can inspect what's being sent to the backend
      console.log('Register:', formData)
      const res = await registerUser(formData)
      const data = res && res.data ? res.data : res
      const user = data.user || data
  const token = data.token || data.accessToken || null

  // Persist token/user in sessionStorage by default after signup.
  persistAuth(token, user, false)

  onSignup(user, token)
    } catch (err) {
      console.error('Signup error response:', err?.response)
      const serverData = err?.response?.data
      const msg = serverData?.message || serverData || err?.message || 'Signup failed'
      setError(typeof msg === 'object' ? JSON.stringify(msg) : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{backgroundColor: '#A8C686'}}>
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EMAGE</h1>
                <p className="text-xs text-gray-500">EMOTIONAL WELLNESS</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-emerald-900">create account</h2>
          <p className="text-gray-600 mb-6">Join EMAGE for your emotional wellness journey</p>

          {error && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>)}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">I am a:</label>
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="patient">Patient</option>
                <option value="therapist">Therapist</option>
              </select>
            </div>

            {formData.role === 'therapist' && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">Specialty</label>
                <input type="text" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} placeholder="e.g., Clinical Psychologist" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
            )}

            <button onClick={handleSignup} disabled={loading} className="w-full py-3 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-900 disabled:opacity-60">{loading ? 'Creating...' : 'SIGN UP'}</button>

            <p className="text-center text-sm text-gray-600">Already have an account?{' '}<button onClick={onSwitchToLogin} className="text-emerald-700 font-semibold">Login</button></p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-emerald-900 to-emerald-700"></div>
    </div>
  )
}
