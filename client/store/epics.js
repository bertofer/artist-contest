// aggregation of epics
import { combineEpics } from 'redux-observable'
import contestEpics from './contest/epics'
import userEpics from './user/epics'
import artistEpics from './artist/epics'

export default combineEpics(contestEpics, userEpics, artistEpics)
