import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'

import { DcScreen } from '../components/dc/DcScreen'
import { HeroesScreen } from '../components/heroes/HeroesScreen'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-2'>
        <Switch>
          <Route exact path='/dc' component={DcScreen} />
          <Route exact path='/marvel' component={MarvelScreen} />
          <Route exact path='/hero/:heroeId' component={HeroesScreen} />
          <Route exact path='/search' component={SearchScreen} />

          <Redirect to='/marvel' />
        </Switch>
      </div>
    </>
  )
}
