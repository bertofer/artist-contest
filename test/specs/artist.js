/* eslint-disable no-unused-expressions */
const expect = require('chai').expect
const App = require('../../server/modules/app')
const EmptyController = require('../utils/controller.mock')
const Artist = require('../../server/modules/artist/')
const request = require('request-promise-native')
const spotifyFixtures = require('../utils/spotify.fixtures')

class HttpMock {
  async get (url) {
    // monkey patching on url to return a spotify-like result
    if (~url.indexOf('top-tracks')) {
      return spotifyFixtures.topTracksFixture
    } else if (~url.indexOf('albums')) {
      return spotifyFixtures.albumsFixture
    } else {
      return spotifyFixtures.metadataFixture
    }
  }
}

describe('Artist', () => {
  const serverUrl = 'http://localhost:3000/'
  let artistModel
  let artistController
  let artistView
  let app
  let http

  beforeEach(() => {
    http = new HttpMock()
    artistModel = new Artist.Model(http)
    artistView = new Artist.View()
    artistController = new Artist.Controller(artistView, artistModel)
    app = new App({
      user: new EmptyController(),
      artist: artistController,
      contest: new EmptyController()
    })
    app.start(3000)
  })

  afterEach(() => {
    app.stop()
  })

  it('should return the artist metadata by the specified id', async () => {
    // radiohead. Test that api is called and view is applied
    const res = await request.get({ url: `${serverUrl}artist/0OdUWJ0sBjDrqHygGUXeCF`, json: true })
    expect(res).to.deep.equal({
      'data': {
        'albums': {
          'resource': '/artist/0OdUWJ0sBjDrqHygGUXeCF/albums'
        },
        'followers': 551435,
        'images': [
          {
            'height': 640,
            'url': 'https://i.scdn.co/image/0f9a5013134de288af7d49a962417f4200539b47',
            'width': 640
          },
          {
            'height': 320,
            'url': 'https://i.scdn.co/image/8ae35be1043f330173de198c35a49161337e829c',
            'width': 320
          },
          {
            'height': 160,
            'url': 'https://i.scdn.co/image/602dd7b3a2ee3f3fd86c6c4f50ab9b5a82e23c59',
            'width': 160
          }
        ],
        'name': 'Band of Horses',
        'popularity': 67,
        'top_tracks': {
          'resource': '/artist/0OdUWJ0sBjDrqHygGUXeCF/top-tracks'
        }
      }
    })
  })

  it('should return artist top-tracks', async () => {
    const res = await request.get({ url: `${serverUrl}artist/0OdUWJ0sBjDrqHygGUXeCF/top-tracks`, json: true })
    expect(res.data[0]).to.deep.equal({
      'name': 'The Funeral',
      'popularity': 57,
      'album': {
        'name': 'Everything All The Time'
      }
    })
  })

  it('should return artist albums', async () => {
    const res = await request.get({ url: `${serverUrl}artist/0OdUWJ0sBjDrqHygGUXeCF/albums`, json: true })
    expect(res.data[0]).to.deep.equal({
      'href': 'https://api.spotify.com/v1/albums/4xBayAng8qIv3227mj3xjN',
      'name': 'Why Are You OK'
    })
  })
})
