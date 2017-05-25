const Router = require('express').Router

class ContestController {
  constructor (view, model) {
    this._model = model
    this._view = view
  }

  async getCurrentList (req, res, next) {
    const current = await this._model.getCurrentList(req.params.id)
    res.json(this._view.currentListView(current))
  }

  router () {
    const router = new Router()
    router.get('/current', this.getCurrentList.bind(this))
    return router
  }
}

module.exports = ContestController
