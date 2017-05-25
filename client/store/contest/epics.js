import { combineEpics } from 'redux-observable'
import * as actions from './actions'
import * as userActions from '../user/actions'
import config from '../../config'
import { Observable } from 'rxjs/Rx'
// import { combineEpics } from 'redux-observable'
const request = require('axios')

const contestUrl = `${config.serverUrl}/contest/current`

const getContest = actions$ =>
  actions$
    .filter(action => action.type === actions.GET_CONTEST)
    .switchMap(action => Observable.fromPromise(request.get(contestUrl))
      .map(res => actions.getContestSuccess(res.data))
      .catch(err => Observable.from(actions.getContestError(err)))
    )

// Epic listening to user vote success or remove, to refresh list of votes!
// Ideally, a strategy of 'optimistic' approach, where we assume the vote goes
// through unless error happened, but this one's faster, as no need to recalculation of votes on FE
const refreshContest = actions$ =>
  actions$
    .filter(action => (
      action.type === userActions.VOTE_SUCCESS ||
      action.type === userActions.REMOVE_VOTE_SUCCESS)
    )
    .map(() => actions.getContest())

export default combineEpics(getContest, refreshContest)
