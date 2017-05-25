export const VOTE = 'VOTE'
export const VOTE_SUCCESS = 'VOTE_SUCCESS'
export const VOTE_ERROR = 'VOTE_ERROR'

export const REMOVE_VOTE = 'REMOVE_VOTE'
export const REMOVE_VOTE_SUCCESS = 'REMOVE_VOTE_SUCCESS'
export const REMOVE_VOTE_ERROR = 'REMOVE_VOTE_ERROR'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export function getUser () {
  return {
    type: GET_USER
  }
}

export function getUserSuccess (data) {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export function getUserError (error) {
  return {
    type: GET_USER_ERROR,
    error
  }
}

export function vote (artist) {
  return {
    type: VOTE,
    artist
  }
}

export function voteSuccess (artist) {
  return {
    type: VOTE_SUCCESS,
    artist
  }
}

export function voteError (error) {
  return {
    type: VOTE_ERROR,
    error
  }
}

export function removeVote () {
  return {
    type: REMOVE_VOTE
  }
}

export function removeVoteSuccess () {
  return {
    type: REMOVE_VOTE_SUCCESS
  }
}

export function removeVoteError (error) {
  return {
    type: REMOVE_VOTE_ERROR,
    error
  }
}
