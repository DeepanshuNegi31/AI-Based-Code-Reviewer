import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: 'Deepanshu',
    password: '1234'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials)
      if (response.data) {
        localStorage.setItem('token', response.data.token)
        onLogin(true)
      }
    } catch (error) {
      console.error('Login Error:', error)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="login-container">
      {/* Welcome Message */}
      <h1 className="welcome-text">Welcome to Code Review Website</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="login-container">
        <div className="floating-blob"></div>
        <div className="floating-blob"></div>
      </div>
    </div>
  )
}
export default Login
