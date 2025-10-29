import React from 'react'
import TherapistCard from './TherapistCard'

const initialTherapists = [
  { id: 't1', name: 'Dr. Amina Odhiambo', specialty: 'Clinical Psychologist', location: 'Nairobi', years: 8 },
  { id: 't2', name: 'Mr. John Mwangi', specialty: 'CBT Therapist', location: 'Nairobi', years: 5 },
  { id: 't3', name: 'Ms. Grace Njeri', specialty: 'Counselling Psychologist', location: 'Mombasa', years: 4 }
]

export default function TherapistsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Therapist</h1>
      <p className="text-gray-600 mb-6">Connect with verified therapists — send a message or request a connection.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialTherapists.map(t => (
          <TherapistCard key={t.id} therapist={t} />
        ))}
      </div>
    </div>
  )
}
