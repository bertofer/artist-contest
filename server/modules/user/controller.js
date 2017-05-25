const Router = require('express').Router

// This would return all other user info, would handle auth, etc..
// For now user is an object that only contains the vote the user has done for this contest
class UserController {
  constructor (view, model, queue) {
    this._view = view
    this._model = model
    this._queue = queue
  }

  async getCurrentUser (req, res, next) {
    const user = await this._model.getCurrentUser()
    res.json(this._view.currentUserView(user))
  }

  // In this part is where for instance I'd use a queue
  // All votes go to user model, but are added to a queue to be aggregated
  // into the contest count by a different service, as race conditions
  // can potentially happen when summing 1 asynchronously in a real env.
  async addVote (req, res, next) {
    const artistId = req.params['artist_id']
    if (await this._model.addVote(artistId)) {
      this._queue.push({
        event: 'upvote',
        data: artistId
      })
      res.status(200).end()
    } else {
      res.status(400).end()
    }
  }

  async removeVote (req, res, next) {
    const removed = await this._model.removeVote()
    this._queue.push({
      event: 'downvote',
      data: removed
    })
    res.status(200).end()
  }

  router () {
    const router = new Router()
    router.get('/', this.getCurrentUser.bind(this))
    router.post('/vote/:artist_id', this.addVote.bind(this))
    router.delete('/vote', this.removeVote.bind(this))
    return router
  }
}

module.exports = UserController
