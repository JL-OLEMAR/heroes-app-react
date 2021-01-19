import React from 'react'
import { mount } from 'enzyme'
import { HeroesScreen } from '../../../components/heroes/HeroesScreen'
import { MemoryRouter, Route } from 'react-router-dom'

describe('Pruebas en <HeroesScreen />', () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn()
  }
  test('debe de mostrarse el componente redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroesScreen history={history} />
      </MemoryRouter>
    )
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })

  test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path='/hero/:heroeId' component={HeroesScreen} />
      </MemoryRouter>
    )
    expect(wrapper.find('.row').exists()).toBe(true)
  })

  test('debe de regresar a la pantalla anterior con PUSH', () => {
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn()
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path='/hero/:heroeId'
          component={() => <HeroesScreen history={history} />}
        />
      </MemoryRouter>
    )
    wrapper.find('button').prop('onClick')()

    expect(history.push).toHaveBeenCalledWith('/')
    expect(history.goBack).not.toHaveBeenCalled()
  })

  test('debe de regresar a la pantalla anterior goBack', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path='/hero/:heroeId'
          component={() => <HeroesScreen history={history} />}
        />
      </MemoryRouter>
    )
    wrapper.find('button').prop('onClick')()

    expect(history.push).toHaveBeenCalledTimes(0)
    expect(history.goBack).toHaveBeenCalled()
  })

  test('debe de llamar el redirect si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spiderkaskdksk']}>
        <Route
          path='/hero/:heroeId'
          component={() => <HeroesScreen history={history} />}
        />
      </MemoryRouter>
    )
    expect(wrapper.text()).toBe('')
  })
})
