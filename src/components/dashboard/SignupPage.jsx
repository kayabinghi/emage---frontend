import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import logo from '../../assets/logo.png'
import { registerUser, persistAuth } from '../../services/api'

export default function SignupPage({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone_number: '', password: '', role: 'patient', specialty: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setError('')
    if (!formData.name || !formData.email || !formData.password || !formData.phone_number) {
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
              <div>
                <img src={logo} alt="EMAGE" className="h-20" />
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
              <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
              <input type="tel" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} placeholder="e.g. +254700000000" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
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

      <div
        className="hidden md:flex md:w-1/2 relative items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: "url('https://girihimalayawellness.com/assets/landing-B9293-0X.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 text-white text-center px-6">
          <h2 className="text-4xl font-bold mb-2">EMAGE</h2>
          <p className="text-emerald-100">Emotional Awareness & Guided Expression</p>
        </div>
      </div>
    </div>
  )
}
