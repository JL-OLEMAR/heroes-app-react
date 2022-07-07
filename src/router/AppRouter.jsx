import { Route, Routes } from 'react-router-dom'

import { HeroesRoutes } from '../heroes'
import { Login } from '../auth'

import { PrivateRoute } from './PrivateRoute.jsx'
import { PublicRoute } from './PublicRoute.jsx'

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route
          element={
            <PublicRoute>
              <Routes>
                <Route element={<Login />} path='/*' />
              </Routes>
            </PublicRoute>
          }
          path='login/*'
        />

        <Route
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
          path='/*'
        />
      </Routes>
    </>
  )
}
