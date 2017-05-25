const Router = require('express').Router

class ArtistController {
  constructor (view, model) {
    this._model = model
    this._view = view
  }

  async getArtistMetadata (req, res, next) {
    const metadata = await this._model.getArtistMetadata(req.params.id)
    res.json(this._view.artistMetadataView(metadata))
  }

  async getArtistAlbums (req, res, next) {
    const albums = await this._model.getArtistAlbums(req.params.id)
    res.json(this._view.artistAlbumsView(albums))
  }

  async getArtistTopTracks (req, res, next) {
    const tracks = await this._model.getArtistTopTracks(req.params.id)
    res.json(this._view.artistTopTracksView(tracks))
  }

  router () {
    const router = new Router()
    router.get('/:id', this.getArtistMetadata.bind(this))
    router.get('/:id/top-tracks', this.getArtistTopTracks.bind(this))
    router.get('/:id/albums', this.getArtistAlbums.bind(this))
    return router
  }
}

module.exports = ArtistController
