import React, { useState, useEffect } from 'react'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import WhyChooseUs from './components/sections/WhyChooseUs';
import DiscoverSection from './components/sections/DiscoverSection';
import ServicesSection from './components/sections/ServicesSection';
import CaringSection from './components/sections/CaringSection';
import SelfCareQuote from './components/sections/SelfCareQuote';
import TestimonialsSection from './components/sections/TestimonialsSection';
import PricingSection from './components/sections/PricingSection';
import FAQSection from './components/sections/FAQSection';
import NewsletterSection from './components/sections/NewsletterSection';
import ContactSection from './components/sections/ContactSection';
import LoginPage from './components/dashboard/LoginPage'
import SignupPage from './components/dashboard/SignupPage'
import Dashboard from './components/dashboard/Dashboard'


export default function App() {

  const [view, setView] = useState('login')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const handleLogin = (userData, token) => {
    setUser(userData)
    setToken(token)
    if (userData.role === 'therapist' && userData.status === 'pending') setView('pending')
    else setView('dashboard')
  }

  const handleSignup = (userData, token) => {
    setUser(userData)
    setToken(token)
    if (userData.role === 'therapist') setView('pending')
    else setView('dashboard')
  }

  const handleLogout = () => {
    clearAuth()
    setUser(null)
    setToken(null)
    setView('login')
  }

  // Rehydrate auth from storage on mount
  useEffect(() => {
    const { token: storedToken, user: storedUser } = getStoredAuth()
    if (storedUser) {
      setUser(storedUser)
      setToken(storedToken)
      if (storedUser.role === 'therapist' && storedUser.status === 'pending') setView('pending')
      else setView('dashboard')
    }
  }, [])

  if (view === 'login') return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setView('signup')} />
  if (view === 'signup') return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setView('login')} />
  if (view === 'pending') return <PendingApproval onBackToLogin={() => setView('login')} />
  if (view === 'dashboard' && user) return <Dashboard user={user} token={token} onLogout={handleLogout} />

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <WhyChooseUs />
      <DiscoverSection />
      <ServicesSection />
      <CaringSection />
      <SelfCareQuote />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

