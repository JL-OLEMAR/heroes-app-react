import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { HeroesApp } from './HeroesApp.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroesApp />
    </BrowserRouter>
  </React.StrictMode>
)
