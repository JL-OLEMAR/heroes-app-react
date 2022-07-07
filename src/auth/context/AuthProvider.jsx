import { useReducer } from 'react'

import { types } from '../types'

import { AuthContext } from './AuthContext.jsx'
import { authReducer } from './authReducer.js'

const lazyInitial = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return { logged: !!user, user }
}

export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, {}, lazyInitial)

  const login = (name = '') => {
    const user = { id: 'ABC', name }

    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: types.login, payload: user })
  }

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: types.logout })
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
