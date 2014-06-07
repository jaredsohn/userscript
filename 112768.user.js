// ==UserScript==
// @name Inline ReplyTo
// @namespace inline_reply_to
// @description Expand to view replyTo in the row.
// @updateURL https://userscripts.org/scripts/source/112768.meta.js
// @run-at document-end
// @include http://twitter.com/*
// @include https://twitter.com/*
// @version 0.4.0
// ==/UserScript==

(function() {
var source = function() { // source code

var VERSION = '0.4.0';
var REPLY_INIT_COUNT = 3;
var REPLY_MORE_COUNT = 10;
var LAZY_TIME = 360;
var REPLY_FROM_ENABLE = true;
//var MORE_EVENT = 'click';
var MORE_EVENT = 'mouseover';
var FRESH_TIME = 2 * 60 * 1000;
var NO_REPLY_FROM_TIME = 1.5 * 60 * 60 * 1000;

var USE_LOCAL_STORAGE_ENABLE = true;
var STORE_PREFIX = 'inlineReplyTo.';
var NO_REPLY_FROM_ID_CACHE_KEY = STORE_PREFIX + 'noReplyFromIds';

var main = function() { // main logic

var oldUi = $('#top-stuff').length != 0;

function $E(tagName, attributes) {
	var e = $(document.createElement(tagName));
	attributes && e.attr(attributes);
	return e;
}

var Cache = (function() {
	var storage = null;
	if (USE_LOCAL_STORAGE_ENABLE && 'localStorage' in window) {
		storage = localStorage;
	} else if ('sessionStorage' in window) {
		storage = sessionStorage;
	}

	var constructor = function(cacheSizeMax, storeKey) {
		this.cacheSizeMax = cacheSizeMax;
		this.storeKey = storeKey;
		this.interval = 20 * 1000;
		this.init();
	};

	var genCache = function() { return { version: VERSION, size: 0 }; };

	constructor.prototype = {
		init: function() {
			this.modified = false;
			this.caches = [];
			if (storage && this.storeKey) {
				var json = storage[this.storeKey];
				if (json) {
					var cache = JSON.parse(json);
					if (cache.version == VERSION) {
						this.caches.push(cache);
					}
				}
				var self = this;
				setInterval(function() {
					if (self.modified) {
						storage[self.storeKey] = JSON.stringify(self.cache());
						self.modified = false;
					}
				}, this.interval);
			}
			if (this.caches.length == 0) {
				this.caches.push(genCache());
			}
		},
		get: function(key) {
			for(var i = 0; i < this.caches.length; i++) {
				var val = this.caches[i][key];
				if (val) {
					return val;
				}
			}
			return null;
		},
		put: function(key, value) {
			this.shift();
			var cache = this.cache();
			if (!(key in cache)) {
				cache.size += 1;
			}
			cache[key] = value;
			this.modified = true;
		},
		shift: function() {
			if (this.cache().size > this.cacheSizeMax) {
				if (this.caches.unshift(genCache()) > 3) {
					this.caches.pop();
				}
				this.modified = true;
			}
		},
		cache: function() { return this.caches[0]; }
	};
	return constructor;
})();
var TweetCache = new Cache(300);
var RelatedCache = new Cache(100);
var NoReplyFromCache = new Cache(200, NO_REPLY_FROM_ID_CACHE_KEY);

var findTweet = function(id, callback) {
	var tweet = TweetCache.get(id);
	if (tweet) {
		callback(tweet);
		return;
	}
	if (twttr.app.currentPageName() == 'permalink') {
		var tweet = twttr.app.currentPage().getInstanceProperty('status');
		TweetCache.put(tweet.id, tweet);
		if (tweet.id == id) {
			callback(tweet);
			return;
		}
	} else {
		var stream = twttr.app.currentPage().getInstanceProperty('streamManager').streams.current;
		var tweets = stream.items;
		for (var i = 0; i < tweets.length; i++) {
			var tweet = tweets[i];
			TweetCache.put(tweet.id, tweet);
			if (tweet.id == id) {
				callback(tweet);
				return;
			}
		}
	}
	twttr.API.Status.find(id, function(data) {
		if (data) {
			TweetCache.put(data.id, data);
		}
		callback(data);	
	});
};

var findRelated = function(id, callback) {
	var relatedTweets = RelatedCache.get(id);
	if (relatedTweets) {
		callback(relatedTweets);
		return;
	}
	if (NoReplyFromCache.get(id)) {
		callback([]);
		return;
	}
	twttr.API.Status.related(id, function(data) {
		var tweets = [];
		data.each(function(results) {
			results.results.each(function(result) {
				var tweet = result.value;
				TweetCache.put(tweet);
				if (id == tweet.inReplyToStatusId) {
					tweets.push(tweet);
				}
			});
		});
		RelatedCache.put(id, tweets);
		callback(tweets);

		if (tweets.length == 0) {
			findTweet(id, function(tweet) {
				if ((new Date().getTime() - twttr.helpers.parseDateString(tweet.createdAt)) > NO_REPLY_FROM_TIME) {
					NoReplyFromCache.put(id, true);
				}
			});
		}
	});
};
var padZero = function(num) {
	var len = 2, str = num.toString(), pad = '';
	for (var i = str.length; i < len; i++) {
		pad += '0';
	}
	return pad + str;
};
var formatTime = function(time) {
	var date = new Date(time);
	var formats = twttr.helpers.timeStrings();
	return [date.getFullYear(), padZero(date.getMonth() + 1), padZero(date.getDate())].join('/') + ' ' +
					[padZero(date.getHours()), padZero(date.getMinutes()), padZero(date.getSeconds())].join(':');
};

var moreClass = 'inreply-more new';

var createReplyToElement = function(reply, replyFrom) {
	var user = reply.user;
	var hrefProf = '/#!/' + user.screenName;
	var hrefDetail = '/#!/' + user.screenName + '/status/' + reply.id;
	var imageUrl = twttr.proto == 'http' ? user.profileImageUrl : user.profileImageUrlHttps;
	var text = twttr.util.linkifyEntities(twttr.util.linkify(reply.text, {nofollow: true}), reply);
	var time = twttr.helpers.parseDateString(reply.createdAt);
	var timeAgo = twttr.helpers.timeAgo(reply.createdAt);
	var explicitTime = formatTime(time);

	var container = 
	$E('div', {'class':'simple-tweet content inreply-container'}).append(
		$E('div', {'class':'content inreply-container-row'}).append(
			$E('div', {'class':'stream-item-header'})
				.append(
					$E('a', {'class':'account-group js-account-group js-action-profile js-user-profile-link', 'href':hrefProf, 'data-user-id':user.idStr})
						.append(
							$E('img', {'class':'avatar js-action-profile-avatar inreply-profile new', 'src':imageUrl}))
						.append(
							$E('strong', {'class':'fullname js-action-profile-name'}).text(user.name))
						.append(
							$E('span', {'class':'username js-action-profile-name'})
								.append($E('s').text('@'))
								.append($E('b').text(user.screenName))))
				.append(
					$E('small', {'class':'time inreply-time'})
						.append(
							$E('a', {'class':'tweet-timestamp', 'title':explicitTime, 'href':hrefDetail})
								.append(
									$E('span', {'class':'_timestamp', 'data-long-form':'true', 'data-time':time}).text(timeAgo))))
				.append($E('p', {'class':'js-tweet-text'}).html(text))
		)
	);
	if (replyFrom) {
		container.addClass('inreply-container-from');
	}

	return container;
};


var appendReplyToElement = function(contentElement, id, appendCount, replyMaxCount) {
	if (id) {
		if (appendCount < replyMaxCount) {
			findTweet(id, function(reply) {
				if (reply) {
					contentElement.append(createReplyToElement(reply));
					appendReplyToElement(contentElement, reply.inReplyToStatusId, appendCount + 1, replyMaxCount);
				}
			});
		} else {
			contentElement.append(
				$E('div', {'class':moreClass}).bind(MORE_EVENT,
					function(event) {
						$(this).remove();
						appendReplyToElement(contentElement, id, 0, REPLY_MORE_COUNT);
						event.stopImmediatePropagation();
					}
				)
			);
		}
	}
};

var appendReplyFromElement = function(contentElement, id, sinceId, replyMaxCount) {
	findRelated(id, function(relatedTweets) {
		if (sinceId) {
			var index = 0;
			for (var i = 0; i < relatedTweets.length; i++) {
				if (sinceId == relatedTweets[i].id) {
					index = i;
					break;
				}
			}
			relatedTweets = relatedTweets.slice(index);
		}
		for (var i = 0; i < relatedTweets.length; i++) {
			var tweet = relatedTweets[i];
			if (i < replyMaxCount) {
				contentElement.append(createReplyToElement(tweet, true));
			} else {
				contentElement.append(
					$E('div', {'class':moreClass}).bind(MORE_EVENT,
						function(event) {
							$(this).remove();
							appendReplyFromElement(contentElement, id, tweet.id, REPLY_MORE_COUNT);
							event.stopImmediatePropagation();
						}
					)
				);
				break;
			}
		}
	});
};

var expandInReplyTo = function(contentElement) {
	findTweet(contentElement.attr('data-item-id'), function(tweet) {
		if (tweet) {
			if (REPLY_FROM_ENABLE) {
				var replyFrom = contentElement.children('.inreply-from');
				if (replyFrom.length == 0) {
					replyFrom = $E('div', {'class':'inreply-from'});
					contentElement.append(replyFrom);
				}
				if ((new Date().getTime() - twttr.helpers.parseDateString(tweet.createdAt)) < FRESH_TIME) {
					contentElement.removeAttr('expanded-in-reply');
					applyLazy(FRESH_TIME / 2);
				} else {
					appendReplyFromElement(replyFrom, tweet.id, null, REPLY_INIT_COUNT);
				}
			} 
			if (tweet.inReplyToStatusId && contentElement.children('.inreply-to').length == 0) {
				var replyTo = $E('div', {'class':'inreply-to'});
				contentElement.append(replyTo);
				appendReplyToElement(replyTo, tweet.inReplyToStatusId, 0, REPLY_INIT_COUNT);
			}
		}
	});
};

var jqWin = $(window);
var lazyTimeoutId = null;
var contentSelecter = '.tweet[data-item-id]:not([expanded-in-reply]):not(.simple-tweet)';
var applyElements = function(context) {
	var top = null;
	var bottom = null;
	$(contentSelecter, context).each(function() {
		if (top == null) {
			top = jqWin.scrollTop();
			bottom = top + jqWin.height();
		}
		var element = $(this);
		var eleTop = element.offset().top;
		if (top <= eleTop && bottom >= eleTop) {
			expandInReplyTo(element.attr('expanded-in-reply', 'expanded-in-reply'));
		}
	});
};
var applyAll = function() { applyElements(document.getElementById('stream-items-id')); };
var applyLazy = function(lazyTime) {
	clearTimeout(lazyTimeoutId);
	lazyTimeoutId = setTimeout(applyAll, lazyTime || LAZY_TIME);
};

setTimeout(function() {
	// initial apply
	applyLazy();

	$(document).bind('DOMNodeInserted', function(e) { 
		if (e.target.tagName.toLowerCase() == 'div') {
			applyLazy();
		}
	});
	$(document).scroll(function() { applyLazy(); });
}, 1600);

}; // /main logic

var cssArry = [
	'.inreply-container { background-color: WhiteSmoke; border-radius: 10px; border-bottom: 1px solid #EBEBEB; }',
	'.inreply-container-from { background-color: Azure; }',
	'.inreply-container-row { margin-left: 48px !important; }',
	'.inreply-profile { height: 32px; width: 32px; }',
	'.inreply-profile.new { height: 38px; width: 38px; top:auto !important;  left:75px !important; }',
	'.inreply-more {' +
		'position: absolute;' +
		'margin-left: 19px;' +
		'margin-top: -21px;' +
		'border-right: 9px solid transparent;' + 
		'border-left: 9px solid transparent;' + 
		'border-top: 18px solid #0084B4;' + 
		'border-bottom: 2px solid #0084B4;' + 
	'}',
	'.inreply-more.new {' +
		'margin-left: 38px;' +
	'}',
	'.inreply-more:hover {' +
		'border-top-color: #FF8000;' + 
		'border-bottom-color: #FF8000;' + 
	'}',
	'.inreply-time {' +
		'float: right;' +
		'position: relative !important;' +
		'top: 0 !important;' +
		'right: 0 !important;' +
		'opacity: inherit !important;' +
	'}'
];
var style = document.createElement('style');
style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(style);
var sheet = style.sheet;
for (var i = 0; i < cssArry.length; i++){
	sheet.insertRule(cssArry[i], sheet.cssRules.length);
}

// load
(function(tryCount) {
	if (tryCount < 20 && !(window.jQuery)) {
		var callee = arguments.callee;
		setTimeout(function() { callee(tryCount + 1); }, 60);
		return;
	}
	main();
})(0);

}; // /source code

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = '(' + source.toString() + ')();';
document.body.appendChild(script);

})();
