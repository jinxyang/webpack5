import { UPDATE_STATUS, UPDATE_USER } from '../actions'
import updateStatus from './updateStatus'
import updateUser from './updateUser'

const handles = {
  [UPDATE_STATUS]: updateStatus,
  [UPDATE_USER]: updateUser,
}

const reducer = (state, action) => {
  const { type, ...payload } = action
  const newState = type in handles ? handles[type](state, payload) : state
  console.group('Store Changed')
  console.log(`TYPE: ${type}`)
  console.log('STATE: ', newState)
  console.groupEnd('Store Changed')
  return newState
}

export default reducer
