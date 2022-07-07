import { useMemo, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { AuthContext } from '../auth'

export function PrivateRoute({ children }) {
  const { isLogged } = useContext(AuthContext)

  // Remember the last remembered page
  const { pathname, search } = useLocation()
  const lastPath = useMemo(() => pathname + search, [pathname, search])

  localStorage.setItem('lastPath', lastPath)

  return isLogged ? children : <Navigate to='/login' />
}
