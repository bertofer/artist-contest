import {
  VOTE,
  VOTE_SUCCESS,
  VOTE_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  REMOVE_VOTE,
  REMOVE_VOTE_SUCCESS,
  REMOVE_VOTE_ERROR
} from './actions'

const R = require('ramda')

// Data last version of Object.assign, object where to overwrite is last
const assign = R.flip(R.merge)

// State can be pending or fulfilled, depending on vote.
// If user had more properties, vote would have own object
const initialState = {
  vote: null,
  state: 'fulfilled'
}
const user = (state = initialState, action) => {
  switch (action.type) {
    case VOTE:
      return assign({ vote: action.artist, state: 'pending' }, state)
    case VOTE_SUCCESS:
      return assign({state: 'fulfilled'}, state)
    case VOTE_ERROR:
      return assign({ vote: null, state: 'fulfilled' }, state)
    case REMOVE_VOTE:
      return assign({ state: 'pending' }, state)
    case REMOVE_VOTE_SUCCESS:
      return assign({state: 'fulfilled', vote: null}, state)
    case REMOVE_VOTE_ERROR:
      return assign({ state: 'fulfilled' }, state) // nothing changes
    case GET_USER:
      return assign({ state: 'pending' }, state)
    case GET_USER_SUCCESS:
      return assign({ state: 'fulfilled', vote: action.data.vote }, state)
    case GET_USER_ERROR:
      return assign({ state: 'fulfilled', vote: null }, state)
    default: return state
  }
}

export default user
