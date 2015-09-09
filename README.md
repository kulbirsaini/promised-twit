# Promised-Twit #

Promised version of [Twit](https://github.com/ttezel/twit) (Twitter API Client for node) with convenient functions to access API endpoints directly without specifying the path.

Uses Twit internally, so there is no magic.

### How To Install? ###

```bash
npm install --save promised-twit
```

### Features

* Promise based
* Uses [Bluebird](https://github.com/petkaantonov/bluebird), so it should be fast
* Convenient function names to access endpoints.

### How To Use?

```javascript
'use strict';

var Twit = require('promised-twit');

var T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...'
})

//
//  tweet 'hello world!'
//
T.postStatusesUpdate({ status: 'hello world!' })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });

//
//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
//
T.getSearchTweets({ q: 'banana since:2011-11-11', count: 100 })
  .then(function(data) {
    console.log(data)
  });

//
//  get the list of user id's that follow @tolga_tezel
//
T.getFollowersIds({ screen_name: 'tolga_tezel' })
  .then(function(data) {
    console.log(data);
  });
})

//
//  retweet a tweet with id '343360866131001345'
//
T.postStatusesRetweetById({ id: '343360866131001345' })
  .then(function(data) {
    console.log(data);
  });

//
//  destroy a tweet with id '343360866131001345'
//
T.postStatusesDestroyById({ id: '343360866131001345' })
  .then(function(data) {
    console.log(data);
  });

//
// get `funny` twitter users
//
T.getUsersSuggestionsBySlug({ slug: 'funny' })
  .then(function(data) {
    console.log(data);
  });

//
// post a tweet with media
//
var b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' })

// first we must post the media to Twitter
T.postMediaUpload({ media_data: b64content })
  .then(function(data) {

    // now we can reference the media and post a tweet (media will attach to the tweet)
    var mediaIdStr = data.media_id_string
    var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

    return T.postStatusesUpdate(params);
  })
  .then(function(data) {
    console.log(data);
  });
```

### Endpoint To Method Name Conversion

Most endpoints are just CamelCase version of path. Following examples cover all the possible scenarios

```javascript
GET statuses/mentions_timeline       => getStatusesMentionsTimeline
GET statuses/retweets/:id            => getStatusesRetweetsById  // :id becomes ById
GET statuses/retweeters/ids          => getStatusesRetweetersIds
POST statuses/update                 => postStatusesUpdate
GET friendships/no_retweets/ids      => getFriendshipsNoRetweetsIds
GET users/suggestions/:slug          => getUsersSuggestionsBySlug // :slug becomes BySlug
GET users/suggestions/:slug/members  => getUsersSuggestionsBySlugMemebers
POST lists/members/create_all        => postListsMembersCreateAll
POST saved_searches/destroy/:id      => postSavedSearchesDestroyById
GET application/rate_limit_status    => getApplicationRateLimitStatus
```

### Additional Methods

#### Twit#requestAsync

Promised version of Twit#request. Takes same parameters except callback and returns a Bluebird `Promise`.

#### Twit#getAsync

Promised version of [Twit#get](https://github.com/ttezel/twit#tgetpath-params-callback). Takes same parameters except callback and returns a Bluebird `Promise`.

#### Twit#postAsync

Promised version of [Twit#post](https://github.com/ttezel/twit#tpostpath-params-callback). Takes same parameters except callback and returns a Bluebird `Promise`.


### Supported APIs

* [Twitter Public REST API](https://dev.twitter.com/rest/public)
* [Twitter Collections REST API](https://dev.twitter.com/rest/collections)

For other APIs and Streaming, [Twit can be used directly](#unsupported).


### FAQs

#### Where do I get the response object?

Response object in the Twit callback signature `function(error, data, response)` is attached to error (in case we have error) or data (in case of success). So you can access it from there as shown below.

```javascript
'use strict';

var Twit = require('promised-twit');

var T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...'
})

//
//  tweet 'hello world!'
//
T.postStatusesUpdate({ status: 'hello world!' })
  .then(function(data) {
    console.log(data._response);
  })
  .catch(function(error) {
    console.log(error._response);
  });
```

#### Does this implement (convert) all endpoints?

No. Endpoints for Twitter Public REST API and Twitter Collections REST API are converted. Following methods are not implemented

 * [POST statuses/update_with_media](https://dev.twitter.com/rest/reference/post/statuses/update_with_media)

<a name="unsupported" />
#### How to use Twit for endpoints not supported?

Promised-Twit is just a wrapper over Twit. You can still use underlying Twit functions.

```javascript
'use strict';

var Twit = require('promised-twit');

var T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...'
})

//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data);
});
```

## License

(The MIT License)

Copyright (c) 2015 Kulbir Saini saini@saini.co.in

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
