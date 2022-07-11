import { MemoryRouter, useNavigate } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Navbar } from '../../../src/ui'
import { AuthContext } from '../../../src/auth'

const mockUseNavigate = jest.fn()

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  // Use everything that's imported from 'react-router-dom'
  ...jest.requireActual('react-router-dom'),

  // Override the useNavigate hook with our mock
  useNavigate: () => mockUseNavigate
}))

describe('Tests in <Navbar />', () => {
  const initialState = {
    isLogged: true,
    user: {
      id: '123',
      name: 'John Doe'
    },
    logout: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should show username', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={initialState}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  test('should call logout and browser when logout button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={initialState}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const logoutButton = screen.getByRole('button')

    fireEvent.click(logoutButton)
    expect(initialState.logout).toHaveBeenCalled()

    // Redirect to login page
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
