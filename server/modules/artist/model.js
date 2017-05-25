/**
 * Metadata uses the spotify API's directly, and uses it's ids to identify artists
 */
class ArtistModel {
  constructor (http) {
    this._http = http
    this._spotifyAPIUrl = 'https://api.spotify.com/v1/artists/'
  }

  async getArtistMetadata (id) {
    return this._http.get(`${this._spotifyAPIUrl}${id}`)
  }

  async getArtistAlbums (id) {
    return this._http.get(`${this._spotifyAPIUrl}${id}/albums`)
  }

  async getArtistTopTracks (id, country = 'GB') {
    return this._http.get(`${this._spotifyAPIUrl}${id}/top-tracks?country=${country}`)
  }
}

module.exports = ArtistModel
