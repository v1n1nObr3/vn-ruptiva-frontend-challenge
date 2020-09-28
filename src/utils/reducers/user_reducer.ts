import { Reducer } from 'react'
import UserData from '../types/user_data'

interface Action {
  message: string
  payload: any
}

const userReducer: Reducer<UserData, Action> = (prevState, action) => {
  const { message, payload } = action

  switch (message) {
    case 'Update-Repositories':
      return {
        ...prevState,
        repositories: payload
      }

    case 'Update-Name':
      return {
        ...prevState,
        ...(prevState.newRepository.name = payload)
      }

    case 'Update-URL':
      return {
        ...prevState,
        ...(prevState.newRepository.url = payload)
      }

    case 'Update-Type':
      return {
        ...prevState,
        ...(prevState.newRepository.type = payload)
      }

    case 'Update-Description':
      return {
        ...prevState,
        ...(prevState.newRepository.description = payload)
      }

    case 'Update-Everything':
      return {
        newRepository: {
          name: '',
          url: '',
          type: 'public',
          description: ''
        },
        repositories: [...prevState.repositories, payload]
      }

    default:
      return prevState
  }
}

export default userReducer
