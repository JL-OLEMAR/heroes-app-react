import { Navigate, Route, Routes } from 'react-router-dom'

import { Navbar } from '../../ui'
import { Dc, Hero, Marvel, Search } from '../pages'

export function HeroesRoutes() {
  return (
    <>
      <Navbar />

      <div className='container'>
        <Routes>
          <Route element={<Marvel />} path='marvel' />
          <Route element={<Dc />} path='dc' />

          <Route element={<Search />} path='search' />
          <Route element={<Hero />} path='hero/:id' />

          <Route element={<Navigate to='/marvel' />} path='/' />
        </Routes>
      </div>
    </>
  )
}
