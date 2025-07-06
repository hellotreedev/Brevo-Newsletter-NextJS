'use client'

import { useState } from 'react'

interface FormState {
  email: string
  isLoading: boolean
  message: string
  messageType: 'success' | 'error' | ''
}

export default function NewsletterSignup() {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    isLoading: false,
    message: '',
    messageType: ''
  })

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      email: e.target.value,
      message: '',
      messageType: ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setFormState(prev => ({
        ...prev,
        message: 'Please enter a valid email address.',
        messageType: 'error'
      }))
      return
    }

    setFormState(prev => ({
      ...prev,
      isLoading: true,
      message: '',
      messageType: ''
    }))

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formState.email }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          email: '',
          message: 'Successfully subscribed to our newsletter!',
          messageType: 'success'
        }))
      } else {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          message: data.error || 'An error occurred. Please try again.',
          messageType: 'error'
        }))
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        message: 'Network error. Please check your connection and try again.',
        messageType: 'error'
      }))
    }
  }

  return (
    <div className="container">
      <h1 className="title">Stay Updated</h1>
      <p className="subtitle">
        Subscribe to our newsletter and be the first to know about updates and new features.
      </p>
      
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="input"
          placeholder="Enter your email address"
          value={formState.email}
          onChange={handleEmailChange}
          required
          disabled={formState.isLoading}
        />
        
        <button
          type="submit"
          className="button"
          disabled={formState.isLoading}
        >
          {formState.isLoading && <span className="spinner"></span>}
          {formState.isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {formState.message && (
        <div className={`message ${formState.messageType}`}>
          {formState.message}
        </div>
      )}
    </div>
  )
} 