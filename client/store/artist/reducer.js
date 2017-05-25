import * as actions from './actions'
const R = require('ramda')
const assign = R.flip(R.merge)

// first metadata comes, then albums and top tracks.
// Because we can come back before fulfilling albums and top tracks,
// check if state is not null before assigning.
// RxJS way would be more appropiate (takeUntil (getBack)), but not sure right now of the proper op
const artist = (state = null, action) => {
  switch (action.type) {
    case actions.GET_METADATA_SUCCESS:
      return {
        metadata: action.data
      }
    case actions.GET_ALBUMS_SUCCESS:
      return state ? assign({ albums: action.data }, state) : state

    case actions.GET_TOP_TRACKS_SUCCESS:
      return state ? assign({ top_tracks: action.data }, state) : state

    case actions.GO_BACK:
      return null
    default: return state
  }
}

export default artist
