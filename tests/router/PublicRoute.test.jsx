import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { AuthContext } from '../../src/auth'
import { PublicRoute } from '../../src/router/PublicRoute.jsx'

describe('Tests in <PublicRoute />', () => {
  test('should render children if user is not logged', () => {
    render(
      <AuthContext.Provider value={{ isLogged: false }}>
        <PublicRoute>
          <h1>Children test</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Children test')).toBeTruthy()
  })

  test('should browse to /marvel if user is logged', () => {
    const initialState = {
      isLogged: true,
      user: {
        id: '123',
        name: 'Test'
      }
    }

    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            {/* Since the current route is login and I am authenticated, it
            redirects me to the marvel route. */}
            <Route
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
              path='login'
            />

            {/* Route to redirect to marvel if user is logged */}
            <Route element={<h1>Marvel Page</h1>} path='marvel' />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel Page')).toBeTruthy()
  })
})
