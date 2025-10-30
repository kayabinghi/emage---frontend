import React from 'react'
import { Clock } from 'lucide-react'

export default function PendingApproval({ onBackToLogin }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-yellow-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Account Pending Approval</h1>

        <p className="text-gray-600 mb-6">Thank you for registering as a therapist. Your account is currently under review by our admin team.</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800"><strong>What happens next?</strong><br/>Our admin will verify your credentials and approve your account within 24-48 hours.</p>
        </div>

        <button onClick={onBackToLogin} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold">Back to Login</button>
      </div>
    </div>
  )
}
