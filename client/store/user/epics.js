import { combineEpics } from 'redux-observable'
import * as actions from './actions'
import config from '../../config'
import { Observable } from 'rxjs/Rx'
// import { combineEpics } from 'redux-observable'
const request = require('axios')

const userUrl = `${config.serverUrl}/user/`

const vote = actions$ =>
  actions$
    .filter(action => action.type === actions.VOTE)
    .switchMap(action => Observable.fromPromise(request.post(`${userUrl}vote/${action.artist}`))
      .map(res => actions.voteSuccess())
      .catch(err => Observable.from(actions.voteError(err)))
    )

const removeVote = actions$ =>
  actions$
    .filter(action => action.type === actions.REMOVE_VOTE)
    .switchMap(action => Observable.fromPromise(request.delete(`${userUrl}vote/`))
      .map(res => actions.removeVoteSuccess())
      .catch(err => Observable.from(actions.removeVoteError(err)))
    )

const getUser = actions$ =>
  actions$
    .filter(action => action.type === actions.GET_USER)
    .switchMap(action => Observable.fromPromise(request.get(`${userUrl}`))
      .map(res => actions.getUserSuccess(res.data))
      .catch(err => Observable.from(actions.getUserError(err)))
    )

export default combineEpics(vote, removeVote, getUser)
