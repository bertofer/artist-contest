export const GET_METADATA = 'GET_METADATA'
export const GET_METADATA_SUCCESS = 'GET_METADATA_SUCCESS'
export const GET_METADATA_ERROR = 'GET_METADATA_ERROR'

export const GET_ALBUMS = 'GET_ALBUMS'
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS'
export const GET_ALBUMS_ERROR = 'GET_ALBUMS_ERROR'

export const GET_TOP_TRACKS = 'GET_TOP_TRACKS'
export const GET_TOP_TRACKS_SUCCESS = 'GET_TOP_TRACKS_SUCCESS'
export const GET_TOP_TRACKS_ERROR = 'GET_TOP_TRACKS_ERROR'

export const GO_BACK = 'GO_BACK'

export function getMetadata (id) {
  return {
    type: GET_METADATA,
    id
  }
}

export function getMetadataSuccess (data) {
  return {
    type: GET_METADATA_SUCCESS,
    data
  }
}

export function getMetadataError (error) {
  return {
    type: GET_METADATA_ERROR,
    error
  }
}

export function getAlbums (resource) {
  return {
    type: GET_ALBUMS,
    resource
  }
}

export function getAlbumsSuccess (data) {
  return {
    type: GET_ALBUMS_SUCCESS,
    data
  }
}

export function getAlbumsError (error) {
  return {
    type: GET_ALBUMS_ERROR,
    error
  }
}

export function getTopTracks (resource) {
  return {
    type: GET_TOP_TRACKS,
    resource
  }
}

export function getTopTracksSuccess (data) {
  return {
    type: GET_TOP_TRACKS_SUCCESS,
    data
  }
}

export function getTopTracksError (error) {
  return {
    type: GET_TOP_TRACKS_ERROR,
    error
  }
}

export function goBack () {
  return {
    type: GO_BACK
  }
}

