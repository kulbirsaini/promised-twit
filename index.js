'use strict';

var BPromise = require('bluebird');
var Twit = require('twit');

Twit.prototype.requestAsync = function (method, path, params) {
  var self = this;
  return new BPromise(function(resolve, reject) {
    self.request(method, path, params, function(error, data, response) {
      if (error) {
        error._response = response;
        reject(error);
      } else {
        data._response = response;
        resolve(data);
      }
    });
  });
};

Twit.prototype.getAsync = function (path, params) {
  return this.requestAsync('GET', path, params);
};

Twit.prototype.postAsync = function (path, params) {
  return this.requestAsync('POST', path, params);
};

/**
 * Twitter Public REST API
 * https://dev.twitter.com/rest/public
 *
 * Endpoints not implemented
 * - POST statuses/update_with_media  https://dev.twitter.com/rest/reference/post/statuses/update_with_media
 *
 * How To Use Examples:
 *
 * GET statuses/mentions_timeline       => getStatusesMentionsTimeline
 * GET statuses/retweets/:id            => getStatusesRetweetsById
 * GET statuses/retweeters/ids          => getStatusesRetweetersIds
 * POST statuses/update                 => postStatusesUpdate
 * GET friendships/no_retweets/ids      => getFriendshipsNoRetweetsIds
 * GET users/suggestions/:slug          => getUsersSuggestionsBySlug
 * GET users/suggestions/:slug/members  => getUsersSuggestionsBySlugMemebers
 * POST lists/members/create_all        => postListsMembersCreateAll
 * POST saved_searches/destroy/:id      => postSavedSearchesDestroyById
 * GET application/rate_limit_status    => getApplicationRateLimitStatus
 */

// GET statuses/mentions_timeline
Twit.prototype.getStatusesMentionsTimeline = function(params) {
  if (!params) {
    return BPromise.resolve([]);
  }

  return this.getAsync('statuses/mentions_timeline', params);
};

// GET statuses/user_timeline
Twit.prototype.getStatusesUserTimeline = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('statuses/user_timeline', params);
};

// GET statuses/home_timeline
Twit.prototype.getStatusesHomeTimeline = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('statuses/home_timeline', params);
};

// GET statuses/retweets_of_me
Twit.prototype.getStatusesRetweetsOfMe = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('statuses/retweets_of_me', params);
};

// GET statuses/retweets/:id
Twit.prototype.getStatusesRetweetsById = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('statuses/retweets/:id', params);
};

// GET statuses/show/:id
Twit.prototype.getStatusesShowById = function(params) {
  if (!params || !params.id) {
    return BPromise.resolve(null);
  }

  return this.getAsync('statuses/show/:id', params);
};

// POST statuses/destroy/:id
Twit.prototype.postStatusesDestroyById = function(params) {
  return this.postAsync('statuses/destroy/:id', params);
};

// POST statuses/update
Twit.prototype.postStatusesUpdate = function(params) {
  return this.postAsync('statuses/update', params);
};

// POST statuses/retweet/:id
Twit.prototype.postStatusesRetweetById = function(params) {
  return this.postAsync('statuses/retweet/:id', params);
};

// GET statuses/oembed
Twit.prototype.getStatusesOembed = function(params) {
  return this.getAsync('statuses/oembed', params);
};

// GET statuses/retweeters/ids
Twit.prototype.getStatusesRetweetersIds = function(params) {
  if (!params || !params.id || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  params.stringify_ids = true;

  return this.getAsync('statuses/retweeters/ids', params);
};

// GET statuses/lookup
Twit.prototype.getStatusesLookup = function(params) {
  if (!params || !params.id) {
    return BPromise.resolve([]);
  }

  // Should use POST instead of GET here as recommended by twitter
  return this.postAsync('statuses/lookup', params);
};

// POST media/upload
Twit.prototype.postMediaUpload = function(params) {
  return this.postAsync('media/upload', params);
};

// GET direct_messages/sent
Twit.prototype.getDirectMessagesSent = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('direct_messages/sent', params);
};

// GET direct_messages/show
Twit.prototype.getDirectMessagesShow = function(params) {
  return this.getAsync('direct_messages/show', params);
};

// GET search/tweets
Twit.prototype.getSearchTweets = function(params) {
  return this.getAsync('search/tweets', params);
};

// GET direct_messages
Twit.prototype.getDirectMessages = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('direct_messages', params);
};

// POST direct_messages/destroy
Twit.prototype.postDirectMessagesDestroy = function(params) {
  return this.postAsync('direct_messages/destroy', params);
};

// POST direct_messages/new
Twit.prototype.postDirectMessagesNew = function(params) {
  return this.getAsync('direct_messages/new', params);
};

// GET friendships/no_retweets/ids
Twit.prototype.getFriendshipsNoRetweetsIds = function(params) {
  if (!params) {
    return BPromise.resolve([]);
  }

  params.stringify_ids = true;

  return this.getAsync('friendships/no_retweets/ids', params);
};

// GET friends/ids
Twit.prototype.getFriendsIds = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  params.stringify_ids = true;

  return this.getAsync('friends/ids', params);
};

// GET followers/ids
Twit.prototype.getFollowersIds = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  params.stringify_ids = true;

  return this.getAsync('followers/ids', params);
};

// GET friendships/incoming
Twit.prototype.getFriendshipsIncoming = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  params.stringify_ids = true;

  return this.getAsync('friendships/incoming', params);
};

// GET friendships/outgoing
Twit.prototype.getFriendshipsOutgoing = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  params.stringify_ids = true;

  return this.getAsync('friendships/outgoing', params);
};

// POST friendships/create
Twit.prototype.postFriendshipsCreate = function(params) {
  return this.postAsync('friendships/create', params);
};

// POST friendships/destroy
Twit.prototype.postFriendshipsDestroy = function(params) {
  return this.postAsync('friendships/destroy', params);
};

// POST friendships/update
Twit.prototype.postFriendshipsUpdate = function(params) {
  return this.postAsync('friendships/update', params);
};

// GET friendships/show
Twit.prototype.getFriendshipsShow = function(params) {
  return this.getAsync('friendships/show', params);
};

// GET friends/list
Twit.prototype.getFriendsList = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      users: []
    });
  }

  return this.getAsync('friends/list', params);
};

// GET followers/list
Twit.prototype.getFollowersList = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      users: []
    });
  }

  return this.getAsync('followers/list', params);
};

// GET friendships/lookup
Twit.prototype.getFriendshipsLookup = function(params) {
  if (!params) {
    return BPromise.resolve([]);
  }

  return this.getAsync('friendships/lookup', params);
};

// GET account/settings
Twit.prototype.getAccountSettings = function(params) {
  return this.getAsync('account/settings', params);
};

// GET account/verify_credentials
Twit.prototype.getAccountVerifyCredentials = function(params) {
  return this.getAsync('account/verify_credentials', params);
};

// POST account/settings
Twit.prototype.postAccountSettings = function(params) {
  return this.postAsync('account/settings', params);
};

// POST account/update_delivery_device
Twit.prototype.postAccountUpdateDeliveryDevice = function(params) {
  return this.postAsync('account/update_delivery_device', params);
};

// POST account/update_profile
Twit.prototype.postAccountUpdateProfile = function(params) {
  return this.postAsync('account/update_profile', params);
};

// POST account/update_profile_background_image
Twit.prototype.postAccountUpdateProfileBackgroundImage = function(params) {
  return this.postAsync('account/update_profile_background_image', params);
};

// POST account/update_profile_image
Twit.prototype.postAccountUpdateProfileImage = function(params) {
  return this.postAsync('account/update_profile_image', params);
};

// GET blocks/list
Twit.prototype.getBlocksList = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      users: []
    });
  }

  return this.getAsync('blocks/list', params);
};

// GET blocks/ids
Twit.prototype.getBlocksIds = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  return this.getAsync('blocks/ids', params);
};

// POST blocks/create
Twit.prototype.postBlocksCreate = function(params) {
  return this.postAsync('blocks/create', params);
};

// POST blocks/destroy
Twit.prototype.postBlocksDestroy = function(params) {
  return this.postAsync('blocks/destroy', params);
};

// GET users/lookup
Twit.prototype.getUsersLookup = function(params) {
  if (!params) {
    return BPromise.resolve([]);
  }

  return this.postAsync('users/lookup', params);
};

// GET users/show
Twit.prototype.getUsersShow = function(params) {
  return this.getAsync('users/show', params);
};

// GET users/search
Twit.prototype.getUsersSearch = function(params) {
  if (!params || !params.q) {
    return BPromise.resolve([]);
  }

  return this.getAsync('users/search', params);
};

// POST account/remove_profile_banner
Twit.prototype.postAccountRemoveProfileBanner = function(params) {
  return this.postAsync('account/remove_profile_banner', params);
};

// POST account/update_profile_banner
Twit.prototype.postAccountUpdateProfileBanner = function(params) {
  return this.postAsync('account/update_profile_banner', params);
};

// GET users/profile_banner
Twit.prototype.getUsersProfileBanner = function(params) {
  return this.getAsync('users/profile_banner', params);
};

// POST mutes/users/create
Twit.prototype.postMutesUsersCreate = function(params) {
  return this.postAsync('mutes/users/create', params);
};

// POST mutes/users/destroy
Twit.prototype.postMutesUsersDestroy = function(params) {
  return this.postAsync('mutes/users/destroy', params);
};

// GET mutes/users/ids
Twit.prototype.getMutesUsersIds = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      ids: []
    });
  }

  params.stringify_ids = true;

  return this.getAsync('mutes/users/ids', params);
};

// GET mutes/users/list
Twit.prototype.getMutesUsersList = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      users: []
    });
  }

  return this.getAsync('mutes/users/list', params);
};

// GET users/suggestions/:slug
Twit.prototype.getUsersSuggestionsBySlug = function(params) {
  return this.getAsync('users/suggestions/:slug', params);
};

// GET users/suggestions
Twit.prototype.getUsersSuggestions = function(params) {
  return this.getAsync('users/suggestions', params);
};

// GET users/suggestions/:slug/members
Twit.prototype.getUsersSuggestionsBySlugMemebers = function(params) {
  return this.getAsync('users/suggestions/:slug/members', params);
};

// GET favorites/list
Twit.prototype.getFavoritesList = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('favorites/list', params);
};

// POST favorites/destroy
Twit.prototype.postFavoritesDestroy = function(params) {
  return this.postAsync('favorites/destroy', params);
};

// POST favorites/create
Twit.prototype.postFavoritesCreate = function(params) {
  return this.postAsync('favorites/create', params);
};

// GET lists/list
Twit.prototype.getListsList = function(params) {
  return this.getAsync('lists/list', params);
};

// GET lists/statuses
Twit.prototype.getListsStatuses = function(params) {
  if (!params || params.count === 0) {
    return BPromise.resolve([]);
  }

  return this.getAsync('lists/statuses', params);
};

// POST lists/members/destroy
Twit.prototype.postListsMembersDestroy = function(params) {
  return this.postAsync('lists/members/destroy', params);
};

// GET lists/memberships
Twit.prototype.getListsMemberships = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      lists: []
    });
  }

  return this.getAsync('lists/memberships', params);
};

// GET lists/subscribers
Twit.prototype.getListsSubscribers = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      users: []
    });
  }

  return this.getAsync('lists/subscribers', params);
};

// POST lists/subscribers/create
Twit.prototype.postListsSubscribersCreate = function(params) {
  return this.postAsync('lists/subscribers/create', params);
};

// GET lists/subscribers/show
Twit.prototype.getListsSubscribersShow = function(params) {
  return this.getAsync('lists/subscribers/show', params);
};

// POST lists/subscribers/destroy
Twit.prototype.postListsSubscribersDestroy = function(params) {
  return this.postAsync('lists/subscribers/destroy', params);
};

// POST lists/members/create_all
Twit.prototype.postListsMembersCreateAll = function(params) {
  return this.postAsync('lists/members/create_all', params);
};

// GET lists/members/show
Twit.prototype.getListsMembersShow = function(params) {
  return this.getAsync('lists/members/show', params);
};

// GET lists/members
Twit.prototype.getListsMembers = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      users: []
    });
  }

  return this.getAsync('lists/members', params);
};

// POST lists/members/create
Twit.prototype.postListsMembersCreate = function(params) {
  return this.postAsync('lists/members/create', params);
};

// POST lists/destroy
Twit.prototype.postListsDestroy = function(params) {
  return this.postAsync('lists/destroy', params);
};

// POST lists/update
Twit.prototype.postListsUpdate = function(params) {
  return this.postAsync('lists/update', params);
};

// POST lists/create
Twit.prototype.postListsCreate = function(params) {
  return this.postAsync('lists/create', params);
};

// GET lists/show
Twit.prototype.getListsShow = function(params) {
  return this.getAsync('lists/show', params);
};

// GET lists/subscriptions
Twit.prototype.getListsSubscriptions = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      lists: []
    });
  }

  return this.getAsync('lists/subscriptions', params);
};

// POST lists/members/destroy_all
Twit.prototype.postListsMembersDestroyAll = function(params) {
  return this.postAsync('lists/members/destroy_all', params);
};

// GET lists/ownerships
Twit.prototype.getListsOwnerships = function(params) {
  if (!params || params.cursor === '0' || params.cursor === 0 || params.count === 0) {
    return BPromise.resolve({
      previous_cursor: 0,
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0',
      lists: []
    });
  }

  return this.getAsync('lists/ownerships', params);
};

// GET saved_searches/list
Twit.prototype.getSavedSearchesList = function(params) {
  return this.getAsync('saved_searches/list', params);
};

// GET saved_searches/show/:id
Twit.prototype.getSavedSearchesShowById = function(params) {
  return this.getAsync('saved_searches/show/:id', params);
};

// POST saved_searches/create
Twit.prototype.postSavedSearchesCreate = function(params) {
  return this.postAsync('saved_searches/create', params);
};

// POST saved_searches/destroy/:id
Twit.prototype.postSavedSearchesDestroyById = function(params) {
  return this.postAsync('saved_searches/destroy/:id', params);
};

// GET geo/id/:place_id
Twit.prototype.getGeoIdByPlaceId = function(params) {
  return this.getAsync('geo/id/:place_id', params);
};

// GET geo/reverse_geocode
Twit.prototype.getGeoReverseGeocode = function(params) {
  return this.getAsync('geo/reverse_geocode', params);
};

// GET geo/search
Twit.prototype.getGeoSearch = function(params) {
  return this.getAsync('geo/search', params);
};

// POST geo/place
Twit.prototype.postGeoPlace = function(params) {
  return this.postAsync('geo/place', params);
};

// GET trends/place
Twit.prototype.getTrendsPlace = function(params) {
  return this.getAsync('trends/place', params);
};

// GET trends/available
Twit.prototype.getTrendsAvailable = function(params) {
  return this.getAsync('trends/available', params);
};

// GET application/rate_limit_status
Twit.prototype.getApplicationRateLimitStatus = function(params) {
  return this.getAsync('application/rate_limit_status', params);
};

// GET help/configuration
Twit.prototype.getHelpConfiguration = function(params) {
  return this.getAsync('help/configuration', params);
};

// GET help/languages
Twit.prototype.getHelpLanguages = function(params) {
  return this.getAsync('help/languages', params);
};

// GET help/privacy
Twit.prototype.getHelpPrivacy = function(params) {
  return this.getAsync('help/privacy', params);
};

// GET help/tos
Twit.prototype.getHelpTos = function(params) {
  return this.getAsync('help/tos', params);
};

// GET trends/closest
Twit.prototype.getTrendsClosest = function(params) {
  return this.getAsync('trends/closest', params);
};

// POST users/report_spam
Twit.prototype.postUsersReportSpam = function(params) {
  return this.postAsync('users/report_spam', params);
};

/*
 * Collections REST API
 * https://dev.twitter.com/rest/collections
 */

// GET collections/list
Twit.prototype.getCollectionsList = function(params) {
  return this.getAsync('collections/list', params);
};

// GET collections/show
Twit.prototype.getCollectionsShow = function(params) {
  return this.getAsync('collections/show', params);
};

// GET collections/entries
Twit.prototype.getCollectionsEntries = function(params) {
  return this.getAsync('collections/entries', params);
};

// POST collections/create
Twit.prototype.postCollectionsCreate = function(params) {
  return this.postAsync('collections/create', params);
};

// POST collections/update
Twit.prototype.postCollectionsUpdate = function(params) {
  return this.postAsync('collections/update', params);
};

// POST collections/destroy
Twit.prototype.postCollectionsDestroy = function(params) {
  return this.postAsync('collections/destroy', params);
};

// POST collections/entries/add
Twit.prototype.postCollectionsEntriesAdd = function(params) {
  return this.postAsync('collections/entries/add', params);
};

// POST collections/entries/remove
Twit.prototype.postCollectionsEntriesRemove = function(params) {
  return this.postAsync('collections/entries/remove', params);
};

// POST collections/entries/move
Twit.prototype.postCollectionsEntriesMove = function(params) {
  return this.postAsync('collections/entries/move', params);
};

// POST collections/entries/curate
Twit.prototype.postCollectionsEntriesCurate = function(params) {
  return this.postAsync('collections/entries/curate', params);
};

module.exports = Twit;
