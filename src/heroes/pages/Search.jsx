import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import { getHeroesByName } from '../helpers'
import { useForm } from '../../hooks'
import { HeroCard } from '../components'

export function Search() {
  const navigate = useNavigate()
  const location = useLocation()

  const { q = '' } = queryString.parse(location.search)
  const heroes = getHeroesByName(q)

  const showSearch = q.length === 0
  const showError = q.length > 0 && heroes.length === 0

  const { searchText, onInputChange } = useForm({ searchText: q })

  const handleSearchSubmit = (evt) => {
    evt.preventDefault()
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className='row'>
        <div className='col-5'>
          <h4>Searching</h4>
          <hr />
          <form aria-label='form' onSubmit={handleSearchSubmit}>
            <input
              autoComplete='off'
              className='form-control'
              name='searchText'
              placeholder='Search a hero'
              type='text'
              value={searchText}
              onChange={onInputChange}
            />

            <button className='btn btn-outline-primary mt-1'>Search</button>
          </form>
        </div>

        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          <div
            className='alert alert-primary animate__animated animate__fadeIn'
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div
            aria-label='alert-danger'
            className='alert alert-danger animate__animated animate__fadeIn'
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  )
}
