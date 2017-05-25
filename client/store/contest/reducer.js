import { GET_CONTEST, GET_CONTEST_SUCCESS } from './actions'

const contest = (state = [], action) => {
  switch (action.type) {
    case GET_CONTEST:
      // New feed requested, delete info
      return []
    case GET_CONTEST_SUCCESS:
      // new feed info
      return action.list

    default: return state
  }
}

export default contest
