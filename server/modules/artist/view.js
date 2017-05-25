// The view in this case, transforms the received model into the JSON format desired
// Some information will be cut out from spotify, from brevity and customization
// Allows for future improvements on the serialization of information received from the model
const R = require('ramda')

class ArtistView {
  artistMetadataView (artist) {
    return {
      data: {
        name: artist.name,
        popularity: artist.popularity,
        followers: artist.followers.total,
        images: artist.images,
        top_tracks: {
          resource: `/artist/${artist.id}/top-tracks`
        },
        albums: {
          resource: `/artist/${artist.id}/albums`
        }
      }
    }
  }

  artistAlbumsView (model) {
    return {
      data: R.project(['name', 'href'])(model.items)
    }
  }

  artistTopTracksView (data) {
    // R.path saves from undefined values triggering errors when lookup nested elems
    // Should be optimized to have a "deep project", so no need to manually
    // specify all paths, just array of paths, with option of nesting. Investigate later
    // Same as before. 2 times duplication is "fine". 3 means refactor ;)
    return {
      data: R.map(track => ({
        name: R.path(['name'], track),
        popularity: R.path(['popularity'], track),
        href: R.path(['href', track]),
        album: {
          name: R.path(['album', 'name'], track)
        }
      }), data.tracks)
    }
  }
}

module.exports = ArtistView
