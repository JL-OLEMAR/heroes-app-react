import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AuthContext } from '../../src/auth'
import { AppRouter } from '../../src/router/AppRouter.jsx'

describe('Tests in <AppRouter />', () => {
  test('should show login if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={{ isLogged: false }}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getAllByText('Login').length).toBe(2)
  })

  test('should show the Marvel component if authenticated', () => {
    const initialState = {
      isLogged: true,
      user: {
        id: '123',
        name: 'John Doe'
      }
    }

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={initialState}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
  })
})
