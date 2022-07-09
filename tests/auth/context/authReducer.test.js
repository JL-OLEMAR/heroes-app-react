import { authReducer, types } from '../../../src/auth'

describe('Tests in the authReducer', () => {
  test('should return the default state', () => {
    const state = authReducer({ isLogged: false }, {})

    expect(state).toEqual({ isLogged: false })
  })

  test('should return the state with the user logged', () => {
    const action = {
      type: types.login,
      payload: { id: '123', name: 'User Test' }
    }

    const state = authReducer({ isLogged: false }, action)

    expect(state).toEqual({
      isLogged: true,
      user: action.payload
    })
  })

  test('should return the state with the user logged out', () => {
    const initialState = {
      isLogged: true,
      user: { id: '123', name: 'User Test' }
    }
    const state = authReducer(initialState, { type: types.logout })

    expect(state).toEqual({ isLogged: false })
  })
})
