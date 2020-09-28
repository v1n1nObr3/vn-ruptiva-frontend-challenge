import { ReducerState } from 'react'
import userReducer from './user_reducer'

const initialState: ReducerState<typeof userReducer> = {
  newRepository: {
    name: '',
    url: '',
    type: 'public',
    description: ''
  },
  repositories: []
}

export default initialState
