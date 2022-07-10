import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { AuthContext } from '../../src/auth'
import { PrivateRoute } from '../../src/router/PrivateRoute.jsx'

describe('Tests in <PrivateRoute />', () => {
  test('should render children if user is logged', () => {
    // Mock the localStorage.setItem('lastPath', lastPath)
    Storage.prototype.setItem = jest.fn()

    const initialState = {
      isLogged: true,
      user: {
        id: '123',
        name: 'John Doe'
      }
    }

    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Private route')).toBeTruthy()

    // Check if the localStorage.setItem('lastPath', lastPath) was called with any private route
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/search?q=batman'
    )
  })
})
