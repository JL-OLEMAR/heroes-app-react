import React from 'react'
import { Link } from 'react-router-dom'

export const HeroCard = ({ id, superhero, publisher, alterEgo, firstAppearance, characters }) => {
  return (
    <div className='card ms-3' style={{ maxWidth: 540 }}>
      <div className='row no-gutters'>

        <div className='col-md-4'>
          <img src={`./assets/heroes/${id}.jpg`} alt={superhero} className='card-img' />
        </div>

        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{superhero}</h5>
            <p className='card-text'>{alterEgo}</p>
            {
              (alterEgo !== characters) &&
                <p className='card-text'>{characters}</p>
            }

            <p className='card-text'>
              <small className='text-muted'>{firstAppearance}</small>
            </p>

            <Link to={`./hero/${id}`}>
              Más...
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}
