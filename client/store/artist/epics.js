import { combineEpics } from 'redux-observable'
import * as actions from './actions'
import config from '../../config'
import { Observable } from 'rxjs/Rx'
// import { combineEpics } from 'redux-observable'
const request = require('axios')

const contestUrl = `${config.serverUrl}/artist/`

// When metadata received, will contain where to go get albums and top tracks
// This would allow to `how-swap` apis on the backend without even having to
// update the frontend :)

const getArtist = actions$ =>
  actions$
    .filter(action => action.type === actions.GET_METADATA)
    .switchMap(action => Observable.fromPromise(request.get(`${contestUrl}${action.id}`))
      .map(res => actions.getMetadataSuccess(res.data.data))
      .catch(err => Observable.from(actions.getMetadataError(err)))
    )

const onArtistMetadata = actions$ =>
  actions$
    .filter(action => action.type === actions.GET_METADATA_SUCCESS)
    .flatMap(action => Observable.from([
      actions.getAlbums(action.data.albums.resource),
      actions.getTopTracks(action.data.top_tracks.resource)
    ]))

const getAlbums = actions$ =>
  actions$
    .filter(action => action.type === actions.GET_ALBUMS)
    .switchMap(action => Observable.fromPromise(request.get(`${config.serverUrl}${action.resource}`))
      .map(res => actions.getAlbumsSuccess(res.data))
      .catch(err => Observable.from(actions.getAlbumsError(err)))
    )

const getTopTracks = actions$ =>
  actions$.filter(action => action.type === actions.GET_TOP_TRACKS)
    .switchMap(action => Observable.fromPromise(request.get(`${config.serverUrl}${action.resource}`))
      .map(res => actions.getTopTracksSuccess(res.data))
      .catch(err => Observable.from(actions.getTopTracksError(err)))
    )

export default combineEpics(getArtist, getAlbums, getTopTracks, onArtistMetadata)
