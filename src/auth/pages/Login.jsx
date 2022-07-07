import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context'

export function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    // Remember the last remembered page
    const lastPath = localStorage.getItem('lastPath') || '/'

    login('Testing user')
    navigate(lastPath, { replace: true })
  }

  return (
    <div className='container mt-5'>
      <h1>Login</h1>
      <hr />

      <button className='btn btn-primary' onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}
