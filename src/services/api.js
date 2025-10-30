import axios from 'axios'

// Base URLs
const API_URL = 'http://127.0.0.1:5501'
const API_URL_AUTH = `${API_URL}/auth`
const API_URL_MOOD = `${API_URL}/mood`
const API_URL_JOURNALS = `${API_URL}/journals`
const API_URL_COMMUNITY = `${API_URL}/community`


// Set/clear auth token in axios headers
export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// Save auth data
export function persistAuth(token, user, remember = false) {
  setAuthToken(token)
  const storage = remember ? localStorage : sessionStorage
  storage.setItem('authToken', token)
  storage.setItem('authUser', JSON.stringify(user))
}

// Clear auth data
export function clearAuth() {
  setAuthToken(null)
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('authUser')
}

// Get stored auth data
export function getStoredAuth() {
  const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
  const userJson = sessionStorage.getItem('authUser') || localStorage.getItem('authUser')
  if (token) setAuthToken(token)
  return { token, user: userJson ? JSON.parse(userJson) : null }
}

// API calls
export const loginUser = (credentials) => axios.post(`${API_URL_AUTH}/login`, credentials)

export async function registerUser(userData) {
  // Normalize frontend -> backend shape: `name` -> `username`
  const payload = { ...userData }
  if (payload.name && !payload.username) {
    payload.username = payload.name
    delete payload.name
  }
  Object.keys(payload).forEach((k) => { if (payload[k] === '') delete payload[k] })
  try { console.debug('Register POST payload:', payload) } catch (e) {}
  return axios.post(`${API_URL_AUTH}/register`, payload)
}
export const logoutUser = () => axios.post(`${API_URL_AUTH}/logout`)
export const forgotPassword = (payload) => axios.post(`${API_URL_AUTH}/forgot-password`, payload)
export const resetPassword = (payload) => axios.post(`${API_URL_AUTH}/reset-password`, payload)


// MOOD API
export async function addMood(userId, emotionalLabel) {
  return axios.post(`${API_URL_MOOD}/add`, { userId, emotionalLabel })
}

export async function getMood(userId) {
  return axios.get(`${API_URL_MOOD}/${userId}`)
}

// JOURNALS API
export async function getJournals(userId) {
  return axios.get(`${API_URL_JOURNALS}/${userId}`)
}

export async function addJournal(userId, journal) {
  return axios.post(`${API_URL_JOURNALS}/${userId}/add`, journal)
}

export async function deleteJournal(id) {
  return axios.delete(`${API_URL_JOURNALS}/${id}`)
}

export async function updateJournal(id, journal) {
  return axios.put(`${API_URL_JOURNALS}/${id}`, journal)
}

// COMMUNITY API
export async function listCommunities() {
  return axios.get(`${API_URL_COMMUNITY}`)
}

export async function createCommunity(payload) {
  return axios.post(`${API_URL_COMMUNITY}/create`, payload)
}

export async function joinCommunity(communityId, userId) {
  return axios.post(`${API_URL_COMMUNITY}/${communityId}/join`, { userId })
}

export async function leaveCommunity(communityId, userId) {
  return axios.post(`${API_URL_COMMUNITY}/${communityId}/leave`, { userId })
}

export async function getCommunityMessages(communityId) {
  return axios.get(`${API_URL_COMMUNITY}/${communityId}/messages`)
}

export async function addCommunityMessage(communityId, message) {
  return axios.post(`${API_URL_COMMUNITY}/${communityId}/messages`, message)
}

export async function sendDirectMessage(payload) {
  // payload: { toUserId, fromUserId, content }
  return axios.post(`${API_URL_COMMUNITY}/messages/direct`, payload)
}

export async function getDirectMessages(userId) {
  return axios.get(`${API_URL_COMMUNITY}/messages/inbox/${userId}`)
}

export async function readMessage(messageId) {
  return axios.post(`${API_URL_COMMUNITY}/messages/${messageId}/read`)
}

export async function connectUsers(payload) {
  // payload: { userA, userB }
  return axios.post(`${API_URL_COMMUNITY}/connect`, payload)
}

export async function listConnectedUsers(userId) {
  return axios.get(`${API_URL_COMMUNITY}/connect/${userId}`)
}

