import { types } from '../../../src/auth'

describe('Test to the types of the auth', () => {
  test('should render correctly', () => {
    expect(types).toEqual({
      login: '[Auth] login',
      logout: '[Auth] logout'
    })
  })
})
