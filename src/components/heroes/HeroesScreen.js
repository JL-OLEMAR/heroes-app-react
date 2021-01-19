import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroeById } from '../../selectores/getHeroeById'

export const HeroesScreen = ({ history }) => {
  const { heroeId } = useParams()

  /* Memoriza el método getHeroeById, para automatizar la carga,
  osea cuando carga los datos ya no los vuelve a cargar,
  porque estan memorizados en memoria, pero depende de la
  variable que recibe el método */
  const hero = useMemo(() => getHeroeById(heroeId), [heroeId])
  // const hero = getHeroeById(heroeId)

  if (!hero) {
    return <Redirect to='/' />
  }

  const { superhero, publisher, alterEgo, firstAppearance, characters } = hero

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  return (
    <div className='row mt-5'>

      <div className='col-4'>
        <img src={`../assets/heroes/${heroeId}.jpg`} alt={superhero} className='img-thumbnail animate__animated animate__fadeInLeft' />
      </div>

      <div className='col-8 animate__animated animate__fadeIn'>
        <h3>{superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><b>Alter ego: </b> {alterEgo}</li>
          <li className='list-group-item'><b>Publisher: </b> {publisher}</li>
          <li className='list-group-item'><b>First appearance: </b> {firstAppearance}</li>
        </ul>

        <h5>Characters</h5>
        <p>{characters}</p>

        <button className='btn btn-outline-info' onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  )
}
