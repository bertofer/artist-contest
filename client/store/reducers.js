// In big apps, abstraction that goes through all folders importing every 'reducer.js'
import {combineReducers} from 'redux'
import contest from './contest/reducer'
import user from './user/reducer'
import artist from './artist/reducer'

export default combineReducers({
  contest,
  user,
  artist
})
