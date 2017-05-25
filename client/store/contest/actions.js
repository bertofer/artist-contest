export const GET_CONTEST = 'GET_CONTEST'
export const GET_CONTEST_SUCCESS = 'GET_CONTEST_SUCCESS'
export const GET_CONTEST_ERROR = 'GET_CONTEST_ERROR'

export function getContest () {
  return {
    type: GET_CONTEST
  }
}

export function getContestSuccess (list) {
  return {
    type: GET_CONTEST_SUCCESS,
    list
  }
}

export function getContestError (error) {
  return {
    type: GET_CONTEST_ERROR,
    error
  }
}
