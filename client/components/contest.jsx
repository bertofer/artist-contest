// entry.js
import React from 'react'
import ReactDOM from 'react-dom'
import { getContest } from '../store/contest/actions'
import {connect} from 'react-redux'
import { vote, removeVote, getUser } from '../store/user/actions'
import { getMetadata } from '../store/artist/actions'

// This file contains container and presentational of the app

class Contest extends React.Component {
  render () {
    return (
      <div className='row' id='contest'>
      {this.props.contest ?
        <ul>
          {this.props.contest.map(artist => (
            <li
              key={artist.spotify_id}
              className='col-xs-12 col-md-8 col-lg-6 col-lg-offset-3 col-md-offset-2 artist-row'>
              <a
                href='#'
                className='artist-name'
                onClick={() => this.props.getArtist(artist.spotify_id)}>
              {artist.name}
              </a>
              <div>
                <span>votes: {artist.votes}</span>
                {
                  artist.spotify_id === this.props.user.vote ?
                  <button
                    className='btn btn-danger'
                    onClick={() => this.props.removeVote()}>
                    Remove vote
                  </button> :
                    !(this.props.user.vote) ?
                    <button
                      onClick={() => this.props.vote(artist.spotify_id)}
                      className='btn btn-success'
                      disabled={this.props.user.state === 'pending'}>
                      Vote
                    </button> :
                    <button className='btn btn-info' disabled>No more votes!</button>
                }
              </div>
            </li>
          ))}
        </ul>
        : 'Loading...'
      }
      </div>
    )
  }

  // Each time we are reprinted, get information again from API
  componentWillMount () {
    this.props.getContest()
    this.props.getUser()
  }
}

const stateProps = (state) => ({
  contest: state.contest,
  user: state.user
})

const dispatchProps = (dispatch) => ({
  getArtist: (id) => dispatch(getMetadata(id)),
  getContest: () => dispatch(getContest()),
  vote: (id) => dispatch(vote(id)),
  removeVote: () => dispatch(removeVote()),
  getUser: () => dispatch(getUser())
})

const ContestContainer = connect(
  stateProps,
  dispatchProps
)(Contest)

export default ContestContainer
