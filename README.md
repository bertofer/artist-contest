# Artists contest
Web application that displays the current leadership of a virtual contest of artists,
and allows the user to vote. It also displays more information about the artist when requested.

Ideally, it will also display information about the next concerts, but I just requested the API
key for songkick, hopefully it will get in time!

## To start
`npm install` and then open 2 different terminals. Type `npm run start-api` in one,
and then `npm run start-ui` in the other, then go to localhost:8080

The tests are run with `npm test`

## Rationale
Why some of the things are like they are. What other things I'd do that I don't because of timing / small API / to go quickly

### Frontend
Some things about the frontend. For brevity I will avoid using a router, but ideally the part
where you go to an artist info would be through a router. For now, it'll be only a condition
if artist info exists or not.

The store is organized in a classical way with redux, and all http actions having their corresponding `ERROR` and `SUCCESS` version. Although is a very accepted solution, I have found
it very verbose in my experience, and there are ways to overcome that. One solution would be what
https://github.com/jevakallio/redux-offline does, where an action specifies effect, success an error on the same definition. Would do it outside hackaday mode, and proceed with the classic for now

Nearly all components are in same folder, and they contain actually 2 components: Container and presentational component inside same file. I like the container - presentational pattern, and would normally separate both in different files, but it's easier like this to go quickly

All css is in a huge large file, but normally I'd look for a way to have it component-based,
so each component is `encapsulated with it's own styles`.

With more time I'd also do more components and smaller. How artist is got from contest
and the fact that user exist in store to show it is a bit hacky, done without router.

I've JSON printed albums and top tracks to display how they arrive lazily. Time to deliver!

### Backend
The backend is organized in modules and services. The modules are the different
resources the API has to offer (contest, concerts, metadata), while the services are the ways the code has
to connect to the exterior (e.g HTTP service, DB service, Email, Redis, ...)

The modules follow a MVC pattern. Controllers connect models with views to return
the value to express. View serializes the original model schema to the one the API
wants.

The model gets the original resource from outside (In this case, Database, other API, ...)

You will see that everything is a class, and for a very specific reason: Testing.

By doing everything as a class, and accepting the dependencies on the constructor,
creates a dependency injection flow were any module or class can me mocked.

The Backend also has a very simple queue, that allows to interconnect different modules without coupling them.
It is used to update the votes, simulating a real environment where the count of the votes would happen
async from the vote itself. This allows to aggregate votes in a 'batch', for instance if the queue
contains 5 votes for same artist, could be done in just 1 operation.

A lot of functions are async for consistency, and because they would really be async in a real environment

### API Testing
The testing, given the short time of the exercise, is very concise and targets endpoint testing.
That is, every endpoint returns the expected data, in the expected format.

Because our models are external API's, we cannot rely on them while running our tests. That
makes it difficult to do proper integration testing, where all services are tested together in a prod-like environment, as I
am not owner / responsible for them.

Strategy is: Mock the http service to return exactly what we would expect the original API
to return for a given ID.

Because everything is separated into different classes, and they are injected into the
modules or services that require them, makes it very easy to also do unit testing of each of the classes
independently, which would be needed for more complex API.

UPDATE: Some unit testing has been also done for things like using the queue. (user vote pushes to queue, etc)
Would add integration test for this later, to test contest and user combined

## Things to improve in non-hackaday mode
Error handling:. A proper API needs proper error handling and messages format shared for all the application,
but because this requires a lot of time without adding visible features or immediate value,
it's something where this exercise does not focus. Also consider the error handling in tests, they are not tested now.

Contest: This one is fairly simple, just has the current list. If timing applied (different contests over time), more complex
data model would be needed with id's etc. Then the vote on the user would always go to the current contest, but when saved would
also save the id of the contest, to have a history of votes.

Abstractions: Because all the modules follow the same pattern with a lot of similarities between them, abstractions could be created
that would improve a lot productivity in larger APIs, like abstract some of the code duplications into configs. E.G
```javascript
async getArtistTopTracks (req, res, next) {
  const tracks = await this._model.getArtistTopTracks(req.params.id)
  res.json(this._view.artistTopTracksView(tracks))
}
```

Almost all controllers follow the same pattern. get from model, pass through view. This API is too small to focus on abstractions,
but for larger API, abstracting this into something more config-driven would heavily improve productivity.

Docs: There are no much docs, some comments here and there. Something to improve for a production-ready API.

Filters: Adding limit / sorting / fields / pagination to the API is something always to consider at least. If those are heavily applied,
then something like GraphQL starts to make sense over REST.

All services would be passed to all controllers and models (or maybe even views) for consistency, would make
all modules independent from each other. Not done for now, queue passed where is needed only, same as http

