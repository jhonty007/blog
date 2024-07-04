import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="auth">
      <h1>LOGIN</h1>
      <form>
        <input required type="text" placeholder='Username' />
        <input required type="password" placeholder='Password' />
        <button>Login</button>
        <p>ERROR !!</p>
        <span>Don't have an acount? <Link to="/register">Register Here</Link></span>
      </form>
    </div>
  )
}

export default Login
