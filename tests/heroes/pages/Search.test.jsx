import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Search } from '../../../src/heroes'

const mockUseNavigate = jest.fn()

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  // Use everything that's imported from 'react-router-dom'
  ...jest.requireActual('react-router-dom'),

  // Override the useNavigate hook with our mock
  useNavigate: () => mockUseNavigate
}))

describe('Tests in <Search />', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should show correctly with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })

  test('should show Batman and the input with the value of the queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    const img = screen.getByRole('img')
    const alertDanger = screen.getByLabelText('alert-danger')

    expect(input.value).toBe('batman')
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
    expect(alertDanger.style.display).toBe('none')
  })

  test('should show error if the hero is not found', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <Search />
      </MemoryRouter>
    )

    const alertDanger = screen.getByLabelText('alert-danger')

    expect(alertDanger.style.display).toBe('')
  })

  test('should call navigate to the new screen', () => {
    const inputValue = 'superman'

    render(
      <MemoryRouter initialEntries={['/search']}>
        <Search />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')

    fireEvent.change(input, {
      target: { name: 'searchText', value: inputValue }
    })

    const form = screen.getByRole('form')

    fireEvent.submit(form)
    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
  })
})
