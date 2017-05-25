const R = require('ramda')

const currentList = [{
  'name': 'Radiohead',
  'spotify_id': '0OdUWJ0sBjDrqHygGUXeCF',
  'mb_id': 'a74b1b7f-71a5-4011-9441-d0b5e4122711', // <- not used for now
  'votes': 12098
}, {
  'name': 'Heaven shall burn',
  'spotify_id': '4sy5qWfwUwpGYBnCKnwfcW',
  'mb_id': '',
  'votes': 10987
}, {
  'name': 'Pendulum',
  'spotify_id': '7MqnCTCAX6SsIYYdJCQj9B',
  'mb_id': '',
  'votes': 3722
}, {
  'name': 'Justin Bieber',
  'spotify_id': '1uNFoZAHBGtllmzznpCI3s',
  'mb_id': '',
  'votes': -9999
}]

class ContestModel {
  constructor (queue) {
    this._queue = queue
    this._queue.on('elements', this.processQueueEvent.bind(this))
  }

  // Potential bug / race condition here. Should check that while updating,
  // the function is not called again, or will cause different function contexts
  // to do the same.
  async processQueueEvent () {
    while (this._queue.first()) {
      const event = this._queue.pop()
      if (event.event === 'upvote') {
        await this.voteUp(event.data)
      } else if (event.event === 'downvote') {
        await this.voteDown(event.data)
      }
    }
  }

  // Async because let's assume it will come asynchronously
  async getCurrentList () {
    return R.clone(currentList)
  }

  // Functions used by the user controller to increase/decrease user's vote
  async voteUp (spotifyId) {
    const artist = R.find(artist => (artist.spotify_id === spotifyId))(currentList)
    artist.votes++
    return true
  }

  async voteDown (spotifyId) {
    const artist = R.find(artist => (artist.spotify_id === spotifyId))(currentList)
    artist.votes--
    return true
  }
}

module.exports = ContestModel
