// ==UserScript==
// @name      Inline Thumbnail v2
// @namespace inline_thumbnail
// @description Expand to view thumbnails in the row.
// @updateURL https://userscripts.org/scripts/source/106779.meta.js
// @run-at document-end
// @include http://hootsuite.com/*
// @include https://hootsuite.com/*
// @include http://twitter.com/*
// @include https://twitter.com/*
// @include https://mobile.twitter.com/*
// @include http://www.crowy.net/*
// @include http://twipple.jp/*
// @include https://web.tweetdeck.com/*
// @version 2
// ==/UserScript==

(function() {
function source() { // source code

var VERSION = '1.5.9';
var USE_LOCAL_STORAGE_ENABLE = true;
var MAX_URL_CACHE = 400;

function isSupportXhr2() { return 'withCredentials' in $.ajaxSettings.xhr(); }
function ajax(arg) {
	var done = 0;
	var option = {
		url: arg.url, data: arg.data, dataType: arg.dataType, type: 'GET', cache: true,
		success: function(data, status, xhr) { done++ || arg.success(data, status, xhr); },
		error: function(xhr, status, errorThrown) { done++ || arg.error(xhr, status, errorThrown); },
	};
	if (arg.dataType == 'jsonp') {
		setTimeout(function() { option.error(); }, 15 * 1000);
	}
	$.ajax(option);
}
function loadJQuery() {
	var id = 'dy-load-jq';
	if (document.getElementById(id)) {
		return;
	}
	var script = document.createElement('script');
	script.id = id;
	script.type = 'text/javascript';
	script.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
	document.body.appendChild(script);
}

function main(EXT_SERV_HOST_URL) { // main logic

var STORE_PREFIX = 'inlineThumbnail.';
var EXPANDED_URL_CACHE_KEY = STORE_PREFIX + 'expandedUrls';
var THUMBNAIL_URL_CACHE_KEY = STORE_PREFIX + 'thumbnailUrls';
var EXT_SERV_ENDS = (function(base) {
	var ret = {
		expandurl: 'expandurl',
		amazon: 'amazon',
		flickr: 'flickr',
		nicovideo: 'nicovideo',
		videosurf: 'videosurf',
		tinami: 'tinami',
		ustream: 'ustream',
		tumblr: 'tumblr',
		rakuten: 'rakuten',
		ogmedia: 'ogmedia',
		jcomi: 'jcomi',
		myspacevideo: 'myspacevideo',
		pictwitter: 'pictwitter',
		itunes: 'itunes',
		loctouch: 'loctouch',
		i500px: '500px',
		twil: 'proxy/twil'
	};
	$.each(ret, function(key, val) { ret[key] = base + '/' + val; });
	return ret;
})(EXT_SERV_HOST_URL);

var HTTPS_SUPPORT_SITE_REGEX = (function() {
	var fragment = (
		'pbs.twimg.com twitpic.com img.ly yfrog.com p.twipple.jp farm\\d.static.flickr.com miil.me' + ' ' +
		''
	).replace(/\./g,'\\.').replace(/ /g, '|');
	return new RegExp('^https?://(?:' + fragment + ')/');
})();
function modPrt(origUrl) {
	if (HTTPS_SUPPORT_SITE_REGEX.test(origUrl)) {
		return origUrl.replace(/^https?:/, '');	
	}
	return origUrl;
}

var ACCESS_CONTROL_SUPPORT_DOMAIN_REGEX = new RegExp('^' + EXT_SERV_HOST_URL + '/');
var SUPPORT_XHR2_CROSS_DOMAIN = isSupportXhr2();

// Utils
function $E(tagName, attributes) {
	var e = $(document.createElement(tagName));
	attributes && e.attr(attributes);
	return e;
}

function callWebApi(endpoint, sendData, complete) {
	var dataType = SUPPORT_XHR2_CROSS_DOMAIN && ACCESS_CONTROL_SUPPORT_DOMAIN_REGEX.test(endpoint) ? 'json' : 'jsonp';
	ajax({
		url: endpoint, data: sendData, dataType: dataType,
		success: function(data, status, xhr) {
			complete(data, xhr && xhr.status);
		},
		error: function(xhr, status, errorThrown) {
			complete(null, xhr && xhr.status);
		}
	});
}

function baseDecode(letters, snipcode) {
	var ret = 0;
	for (var i = snipcode.length, m = 1; i; i--, m *= letters.length) {
		ret += letters.indexOf(snipcode.charAt(i-1)) * m;
	}
	return ret;
}
function base58decode(snipcode) {
	return baseDecode('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', snipcode);
}
function base36decode(snipcode) {
	return baseDecode('0123456789abcdefghijklmnopqrstuvwxyz', snipcode);
}

function unique(array, prop) {
	if (array == null) {
		return null;
	}
	var uniqueSet = {};
	return $.grep(array, function(value) {
		var key = value[prop];
		var result = !(key in uniqueSet);
		if (result) {
			uniqueSet[key] = true;
		}
		return result;
	});
}
function objectToArray(obj) {
	var arry = [];
	for (var k in obj) {
		arry.push(obj[k]);
	}
	return arry;
}
// /Utils

// Cache
var Cache = (function() {
	var storage = null;
	if (USE_LOCAL_STORAGE_ENABLE && window.localStorage) {
		storage = localStorage;
	} else if (window.sessionStorage) {
		storage = sessionStorage;
	}

	function constructor(cacheSizeMax, storeKey) {
		this.cacheSizeMax = cacheSizeMax;
		this.storeKey = storeKey;
		this.interval = 20 * 1000;
		this.init();
	}

	function genCache() {
		return { version: VERSION, size: 0 };
	}

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

var ExpandedUrlCache = new Cache(MAX_URL_CACHE, EXPANDED_URL_CACHE_KEY);
ExpandedUrlCache.put_orig = ExpandedUrlCache.put;
ExpandedUrlCache.put = function(key, value) {
	if (key == value) {
		return;
	}
	this.put_orig(key, value);
};
var ThumbnailUrlCache = new Cache(MAX_URL_CACHE, THUMBNAIL_URL_CACHE_KEY);
// /Cache

// WebService
function expandShortUrl(shortUrl, complete) {
	var cached = ExpandedUrlCache.get(shortUrl);
	if (cached) {
		complete(cached);
		return;
	}
	callWebApi(EXT_SERV_ENDS.expandurl, { url: shortUrl }, function(data, statusCode) {
		var longUrl = null;
		if (data) {
			longUrl = data['long-url'];
			ExpandedUrlCache.put(shortUrl, longUrl);
		}
		complete(longUrl);
	});
}

var twitcasting = {
	fetchUserImage: function(userId, complete) {
		callWebApi('http://api.twitcasting.tv/api/userstatus', { user: userId }, function(data) {
			complete(data && data.image, true);
		});
	},
	fetchMovieThumbnail: function(movieId, userId, complete) {
		var self = this;
		callWebApi('http://api.twitcasting.tv/api/moviestatus', { movieid: movieId }, function(movieData) {
			if (movieData) {
				if (movieData.thumbnailsmall) {
					complete(movieData.thumbnailsmall, true);
				} else {
					self.fetchUserImage(userId, complete);
				}
			} else {
				complete();
			}
		});
	},
	fetchLiveThumbnail: function(userId, complete) {
		var completeNoCache = function(thumbUrl) { complete(thumbUrl); }; // ignore cache
		var self = this;
		callWebApi('http://api.twitcasting.tv/api/livestatus', { user: userId }, function(liveData) {
				if (liveData) {
					if (liveData.islive) {
						completeNoCache('http://twitcasting.tv/' + userId + '/thumbstream/liveshot-1');
					} else if (liveData.movieid) {
						self.fetchMovieThumbnail(liveData.movieid, userId, completeNoCache);
					} else {
						self.fetchUserImage(userId, completeNoCache);
					}
				} else {
					completeNoCache();
				}
		});
	}
};

function fetchUstreamThumbnail(subject, uid, complete) {
	callWebApi('http://api.ustream.tv/json/' + subject + '/' + uid + '/getValueOf/imageUrl', {}, function(data) {
		complete(data && data.small, true);
	});
}

function resolvOgmediaDefault(matched, complete) {
	callWebApi(EXT_SERV_ENDS.ogmedia, { url: matched[0] }, function(data) {
		complete(data && data.url, true);
	});
}
// /WebService

// ShortUrlRegexs
var SHORT_URL_REGEX = (function() {
	var fragment = (
		'bit.ly j.mp t.co htn.to ux.nu ustre.am am6.jp ow.ly ht.ly fb.me lnk.ms dai.ly a.r10.to' + ' ' +
		'cot.ag p.tl amzn.to dlvr.it goo.gl moi.st dailybooth.com/u tinyurl.com sgp.cm pbckt.com' + ' ' +
		'fon.gs mysp.ac itun.es is.gd v.gd r.sm3.jp tou.ch po.st post.ly pocket.co'
	).replace(/\./g,'\\.').replace(/ /g, '|');
	return new RegExp('^http://(?:' + fragment + ')/[\\w\\-:\\.]+');
})();
// /ShortUrlRegexs

// ThumbnailResolvers
var THUMB_RESOLVERS = {
	allimg: {
		priority: -1,
		regex: /^https?:\/\/[^?]+?\.(?:jpe?g|png|gif|bmp|JPE?G|PNG|GIF|BMP)(?=\?|$)/,
		resolv: function(matched, complete) {
			complete(matched[0]);
		}
	},
	twitpic: {
		priority: 2,
		regex: /^http:\/\/twitpic\.com\/(\w+)/,
		regexThumb: /^http:\/\/twitpic\.com\/show\/thumb\/\w+/,
		resolv: function(matched, complete) {
			complete('http://twitpic.com/show/thumb/' + matched[1]);
		}
	},
	imgly: {
		regex: /^http:\/\/img\.ly\/(\w+)/,
		regexThumb: /^http:\/\/img\.ly\/show\/thumb\/\w+/,
		resolv: function(matched, complete) {
			complete('http://img.ly/show/thumb/' + matched[1]);
		}
	},
	twitgoo: {
		regex: /^http:\/\/twitgoo\.com\/(\w+)/,
		regexThumb: /^http:\/\/twitgoo\.com\/show\/thumb\/\w+/,
		resolv: function(matched, complete) {
			complete('http://twitgoo.com/show/thumb/' + matched[1]);
		}
	},
	picim: {
		regex: /^http:\/\/pic\.im\/(\w+)/,
		regexThumb: /^http:\/\/pic\.im\/website\/thumbnail\/\w+/,
		resolv: function(matched, complete) {
			complete('http://pic.im/website/thumbnail/' + matched[1]);
		}
	},
	youtube: {
		regex: /^(?:http:\/\/www\.youtube\.com\/watch\/?\?v=([\w\-]+))|(?:http:\/\/youtu\.be\/([\w\-]+))/,
		resolv: function(matched, complete) {
			var id = matched[2] || matched[1];
			complete('http://i.ytimg.com/vi/' + id + '/default.jpg');
		}
	},
	imgur: {
		regex: /^http:\/\/imgur\.com\/(?:r\/pics\/)?(\w+)(?!\/)/,
		resolv: function(matched, complete) {
			complete('http://i.imgur.com/' + matched[1] + 't.jpg');
		}
	},
	owly: {
		regex: /^http:\/\/ow\.ly\/i\/(\w+)/,
		resolv: function(matched, complete) {
			complete('http://static.ow.ly/photos/thumb/' + matched[1] + '.jpg');
		}
	},
	movapic: {
		regex: /^http:\/\/movapic\.com\/pic\/(\w+)/,
		resolv: function(matched, complete) {
			complete('http://image.movapic.com/pic/s_' + matched[1] + '.jpeg');
		}
	},
	hatena: {
		regex: /^http:\/\/f\.hatena\.ne\.jp\/([\w\-]+)\/(\d+)/,
		resolv: function(matched, complete) {
			complete(['http://cdn-ak.f.st-hatena.com/images/fotolife', matched[1].charAt(0), matched[1], matched[2].substr(0, 8), matched[2]].join('/') + '_120.jpg');
		}
	},
	moby: {
		regex: /^http:\/\/moby\.to\/(\w+)/,
		resolv: function(matched, complete) {
			complete(matched[0] + ':square');
		}
	},
	yfrog: {
		regex: /^http:\/\/yfrog\.com\/\w+/,
		resolv: function(matched, complete) {
			complete(matched[0] + ':small');
		}
	},
	plixi: {
		regex: /^http:\/\/plixi\.com\/p\/(\w+)/,
		regexThumb: /^http:\/\/api\.plixi\.com\/api\/TPAPI\.svc\/imagefromurl\?size=thumbnail&url=http:\/\/plixi\.com\/p\/\w+/,
		resolv: function(matched, complete) {
			complete('http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=' + matched[0]);
		}
	},
	nicovideo: {
		regex: /^(?:http:\/\/www\.nicovideo\.jp\/watch\/(?:sm|nm)(\d+))|(?:http:\/\/nico\.ms\/(?:sm|nm)(\d+))/,
		regexThumb: /^http:\/\/tn-skr\d?\.smilevideo\.jp\/smile\?i=\d+/,
		resolv: function(matched, complete) {
			var id = matched[2] || matched[1];
			complete('http://tn-skr.smilevideo.jp/smile?i=' + id);
		}
	},
	nicovideoapi: {
		regex: /^(?:http:\/\/(?:www|live)\.nicovideo\.jp\/(?:watch|gate)\/((?:lv)?\d+))|(?:http:\/\/nico\.ms\/((?:lv)?\d+))/,
		resolv: function(matched, complete) {
			var id = matched[2] || matched[1];
			callWebApi(EXT_SERV_ENDS.nicovideo, { id: id }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	nicoseiga: {
		regex: /^(?:http:\/\/seiga\.nicovideo\.jp\/seiga\/im(\d+))|(?:http:\/\/nico\.ms\/im(\d+))/,
		regexThumb: /^http:\/\/lohas\.nicoseiga\.jp\/thumb\/\d+[qi]/,
		resolv: function(matched, complete) {
			var id = matched[2] || matched[1];
			complete('http://lohas.nicoseiga.jp/thumb/' + id + 'q');
		}
	},
	nicocomu: {
		regex: /^http:\/\/com\.nicovideo\.jp\/community\/co(\d+)/,
		resolv: function(matched, complete) {
			complete('http://icon.nimg.jp/community/co' + matched[1] + '.jpg');
		}
	},
	twipple: {
		regex: /^http:\/\/p\.twipple\.jp\/(\w+)$/,
		regexThumb: /^http:\/\/p\.twpl\.jp\/show\/thumb\/\w+/,
		resolv: function(matched, complete) {
			complete('http://p.twpl.jp/show/thumb/' + matched[1]);
		}
	},
	photozou: {
		regex: /^http:\/\/photozou\.jp\/photo\/show\/\d+\/(\d+)/,
		regexThumb: /^http:\/\/photozou\.jp\/p\/thumb\/\d+/,
		resolv: function(matched, complete) {
			complete('http://photozou.jp/p/thumb/' + matched[1]);
		}
	},
	ustream: {
		regex: /^http:\/\/(?:www\.)?ustream\.tv\/(channel|recorded)\/(?:id\/)?([\w\-%]+)/,
		subjects: { 'channel': 'channel', 'recorded': 'video' },
		resolv: function(matched, complete) {
			fetchUstreamThumbnail(this.subjects[matched[1]], matched[2], complete);
		}
	},
	lockerz: {
		regex: /^http:\/\/lockerz\.com\/s\/\d+/,
		regexThumb: /^http:\/\/api\.plixi\.com\/api\/tpapi\.svc\/imagefromurl\?size=thumbnail&url=http:\/\/lockerz\.com\/s\/\d+/,
		resolv: function(matched, complete) {
			complete('http://api.plixi.com/api/tpapi.svc/imagefromurl?size=thumbnail&url=' + matched[0]);
		}
	},
	jcomi: {
		regex: /^http:\/\/(?:www\.|vw\.)?j-comi\.jp\/(?:book|murasame)\/(?:comic|detail|view)\/(\d+)/,
		resolv: function(matched, complete) {
			var id = matched[1];
			if (id == '1' || id == '21') {
				id += '01';
			}
			callWebApi(EXT_SERV_ENDS.jcomi, { id: id }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	picplz: {
		regex: /^http:\/\/picplz\.com\/(?:user\/\w+\/pic\/(\w+)|(\w+))/,
		resolv: function(matched, complete) {
			var param = {};
			if (matched[1]) {
				param.longurl_id = matched[1];
			} else {
				param.shorturl_id = matched[2];
			}
			callWebApi('http://api.picplz.com/api/v2/pic.json', param, function(data) {
				var imgUrl = null;
				if (data && data.result == 'ok') {
					imgUrl = data.value.pics[0].pic_files['100sh'].img_url;
				};
				complete(imgUrl, true);
			});
		}
	},
	kabegami: {
		regex: /^http:\/\/www\.kabegami\.com\/[\w\-]+\/\w+\/show\/id\/(PHOT(\d{10})(\w\w)(\w\w)\w\w)/,
		resolv: function(matched, complete) {
			complete(['http://www.kabegami.com/content_image/phot', matched[2], matched[3], matched[4], matched[1]].join('/') + '_s90.jpg');
		}
	},
	instagram: {
		regex: /^http:\/\/(?:instagr\.am|instagram\.com)\/p\/[\w\-]+/,
		resolv: function(matched, complete) {
			complete(matched[0] + '/media/?size=t');
		}
	},
	mypix: {
		regex: /^http:\/\/www\.mypix\.jp\/app\.php\/picture\/\d+/,
		resolv: function(matched, complete) {
			complete(matched[0] + '/thumbx.jpg');
		}
	},
	fotolog: {
		regex: /^http:\/\/fotolog\.cc\/(\w+)/,
		regexThumb: /^http:\/\/fotolog\.cc\/image\/\w+\/mini/,
		resolv: function(matched, complete) {
			complete('http://fotolog.cc/image/' + matched[1] + '/mini');
		}
	},
	vimeo: {
		regex: /^http:\/\/(?:www\.)?vimeo\.com\/(\d+)/,
		resolv: function(matched, complete) {
			callWebApi('http://vimeo.com/api/v2/video/' + matched[1] + '.json', {}, function(data) {
				complete(data && data[0].thumbnail_small, true);
			});
		}
	},
	dailybooth: {
		regex: /^http:\/\/dailybooth\.com\/[\w\-]{2,}\/(\d+)/,
		resolv: function(matched, complete) {
			callWebApi('http://api.dailybooth.com/v2/pictures/' + matched[1] + '.json', {}, function(data) {
				complete(data && data.urls.small, true);
			});
		}
	},
	twitcasting: {
		regex: /^http:\/\/twitcasting\.tv\/([\w\-]+)\/movie\/(\d+)/,
		resolv: function(matched, complete) {
			var userId = matched[1];
			var movieId = matched[2];
			twitcasting.fetchMovieThumbnail(movieId, userId, complete);
		}
	},
	twitcastinglive: {
		regex: /^http:\/\/twitcasting\.tv\/([\w\-]+)\/?$/,
		resolv: function(matched, complete) {
			var userId = matched[1];
			twitcasting.fetchLiveThumbnail(userId, complete);
		}
	},
	metacafe: {
		regex: /^http:\/\/www\.metacafe\.com\/(?:w|watch)\/([\w\-]+)/,
		resolv: function(matched, complete) {
			complete('http://www.metacafe.com/thumb/' + matched[1] + '.jpg');
		}
	},
	dailymotion: {
		regex: /^http:\/\/(?:www|touch)\.dailymotion\.com\/(?:#\/)?video\/([\w\-]+)/,
		resolv: function(matched, complete) {
			callWebApi('https://adf.ly/3966902/https://api.dailymotion.com/video/' + matched[1], { fields: 'thumbnail_medium_url' }, function(data) {
				complete(data && data.thumbnail_medium_url, true);
			});
		}
	},
	stickamjpprof: {
		regex: /^http:\/\/(?:www\.stickam\.jp\/profile|stick\.am\/p)\/(\w+)/,
		resolv: function(matched, complete) {
			callWebApi('http://api.stickam.jp/api/user/' + matched[1] + '/profile', { mime: 'json' }, function(data) {
				complete(data && data.profile_image, true);
			});
		}
	},
	stickamjpmedia: {
		regex: /^http:\/\/www\.stickam\.jp\/video\/(\d+)/,
		resolv: function(matched, complete) {
			callWebApi('http://api.stickam.jp/api/media/' + matched[1], { mime: 'json' }, function(data) {
				complete(data && data.media && data.media.thumb, true);
			});
		}
	},
	photobucket: {
		regex: /^http:\/\/[is]\d+\.photobucket\.com\/albums\/.+/,
		resolv: function(matched, complete) {
			callWebApi('http://photobucket.com/oembed', { url: matched[0] }, function(data) {
				complete(data && data.thumbnail_url, true);
			});
		}
	},
	pixiv: {
		regex: /^http:\/\/(?:www\.pixiv\.net\/member_illust\.php\/?\?(?:mode=medium&)?illust_id=|p\.tl\/i\/)(\d+)/,
		resolv: function (matched, complete) {
			callWebApi(EXT_SERV_ENDS.ogmedia, { url: 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + matched[1] }, function(data) {
				complete(data && data.url.replace(/\/(\d+)_s.[a-z]+$/, '/mobile/$1_87ms.jpg'), true);
			});
		}
	},
	flickr: {
		regex: /^http:\/\/(?:www\.flickr\.com\/photos\/[\w@\-]+\/(\d+))|(?:flic\.kr\/p\/(\w+))/,
		resolv: function(matched, complete) {
			var id = matched[2] ? base58decode(matched[2]) : matched[1];
			callWebApi(EXT_SERV_ENDS.flickr, { photo_id: id }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	videosurf: {
		regex: /^http:\/\/www\.videosurf\.com\/video\/-?(?:[a-zA-Z0-9%]+-)*(\d+)\b/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.videosurf, { id: matched[1] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	tinami: {
		regex: /^http:\/\/(?:www\.tinami\.com\/view\/(\w+)|tinami\.jp\/(\w+))/,
		resolv: function(matched, complete) {
			var id = matched[2] ? base36decode(matched[2]) : matched[1];
			callWebApi(EXT_SERV_ENDS.tinami, { id: id }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	akibablog: {
		regex: /^http:\/\/blog\.livedoor\.jp\/geek\/archives\/\d+\.html/,
		resolv: resolvOgmediaDefault
	},
	photobucketmedia: {
		regex: /^http:\/\/media\.photobucket\.com\/.+/,
		resolv: resolvOgmediaDefault
	},
	ustreamsp: {
		regex: /^http:\/\/(?:www\.)?ustream\.tv\/[\w\-%]+(?=\/?$)/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.ustream, { url: matched[0] }, function(data) {
				if (data) {
					fetchUstreamThumbnail('channel', data.channelId, complete);
				} else {
					complete();
				}
			});
		}
	},
	tumblr: {
		regex: /^http:\/\/([\w\-]+\.tumblr\.com)\/post\/(\d+)/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.tumblr, { base_hostname: matched[1], post_id: matched[2] }, function(data) {
					complete(data && data.url, true);
			});
		}
	},
	tumblrs: {
		regex: /^http:\/\/(?:tumblr\.com|tmblr\.co)\/[\w\-]+/,
		resolv: function(matched, complete) {
			expandShortUrl(matched[0], function(longUrl) {
				var regex = /^http:\/\/((?:\.?[\w\-]+)+)\/post\/(\d+)/;
				if (regex.test(longUrl)) {
					THUMB_RESOLVERS.tumblr.resolv(longUrl.match(regex), complete);
				} else {
					complete();
				}
			});
		}
	},
	rakutenbooks: {
		regex: /^http:\/\/books\.rakuten\.co\.jp\/rb\/[\w%\-]+\-(\d+)\//,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.rakuten, { type: 'book', id: matched[1] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	rakutenitem: {
		regex: /^http:\/\/item\.rakuten\.co\.jp\/([\w\-]+\/[\w\-]+)/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.rakuten, { type: 'item', id: matched[1] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	twil: {
		regex: /^http:\/\/shlink\.st\/[\w\-]+/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.twil, { url: matched[0] }, function(data) {
				complete(data && data.thumbnail_url, true);
			});
		}
	},
	twitrpix: {
		regex: /^http:\/\/twitrpix\.com\/(\w+)/,
		regexThumb: /^http:\/\/img\.twitrpix\.com\/thumb\/\w+/,
		resolv: function(matched, complete) {
			complete('http://img.twitrpix.com/thumb/' + matched[1]);
		}
	},
	pikchur: {
		regex: /^http:\/\/(?:pikchur\.com|pk\.gd)\/(\w+)/,
		resolv: function(matched, complete) {
			complete(' http://img.pikchur.com/pic_' + matched[1] + '_s.jpg');
		}
	},
	twitxr: {
		regex: /^http:\/\/twitxr\.com\/(\w+)\/updates\/(\d+)/,
		regexThumb: /^http:\/\/twitxr\.com\/image\/\d+\/th/,
		resolv: function(matched, complete) {
			complete('http://twitxr.com/image/' + matched[2] + '/th');
		}
	},
	myspacevideo: {
		regex: /^http:\/\/(?:www\.)?myspace\.com\/video\/(?:(vid|rid)|[\w-]+\/[\w-]+)\/(\d+)/,
		resolv: function(matched, complete) {
			var id = (matched[1] || 'vid') + '/' + matched[2];
			callWebApi(EXT_SERV_ENDS.myspacevideo, { id: id }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	myspacevideovids: {
		regex: /^http:\/\/(?:vids\.|www\.)?myspace\.com\/index\.cfm\?fuseaction=vids\.individual&videoid=(\d+)/,
		resolv: function(matched, complete) {
			var id = 'vid/' + matched[1];
			callWebApi(EXT_SERV_ENDS.myspacevideo, { id: id }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	twitvideo: {
		regex: /^http:\/\/twitvideo\.jp\/(\w+)/,
		regexThumb: /^http:\/\/twitvideo\.jp\/img\/thumb\/\w+/,
		resolv: function(matched, complete) {
			complete('http://twitvideo.jp/img/thumb/' + matched[1]);
		}
	},
	mycom: {
		regex: /^http:\/\/(?:if\.|s\.)?journal\.mycom\.co\.jp\/\w+\/\d+\/\d+\/\d+\/\w+\//,
		resolv: function(matched, complete) {
			complete(matched[0] + 'index.top.jpg');
		}
	},
	twitvid: {
		regex: /^http:\/\/(?:www\.)?twitvid\.com\/(?!videos)(\w+)/,
		resolv: function(matched, complete) {
			var id = matched[1];
			complete(['http://llphotos.twitvid.com/twitvidthumbnails', id.charAt(0), id.charAt(1), id.charAt(2), id].join('/') + '_med.jpg');
		}
	},
	pckles: {
		regex: /^http:\/\/(?:pckl\.es|pckles\.com)\/\w+\/\w+/,
		resolv: function(matched, complete) {
			complete(matched[0] + '.thumb.jpg');
		}
	},
	itunes: {
		regex: /^http:\/\/(?:c\.)?itunes\.apple\.com\/.*\/id\w+(?:\?i=\d+)?/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.itunes, { url: matched[0] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	loctouch: {
		regex: /^http:\/\/tou\.ch\/spot\/\d+\/(\w+)\/(\d+)/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.loctouch, { type: matched[1], id: matched[2] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	miil: {
		regex: /^http:\/\/miil\.me\/p\/(\w+)/,
		resolv: function(matched, complete) {
			complete(matched[0] + '.jpeg?size=150');
		}
	},
	i500px: {
		regex: /^https?:\/\/(?:www\.)?500px\.com\/photo\/(\d+)/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.i500px, { id: matched[1] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	hulu: {
		regex: /^http:\/\/(?:www\.hulu\.com\/watch|hulu\.com\/w)\/.*/,
		resolv: function(matched, complete) {
			callWebApi('http://www.hulu.com/api/oembed', { url: matched[0] }, function(data) {
				complete(data && data.thumbnail_url, true);
			});
		}
	},
	facebook: {
		regex: /^https?:\/\/www\.facebook\.com\/photo\.php\?(pid=.+)/,
		resolv: function(matched, complete) {
			expandShortUrl('https://adf.ly/3966902/https://www.facebook.com/twitter/photo/?' + matched[1], function(url) {
				var imgUrl = null;
				if (url) {
					imgUrl = url.replace(/_n\.jpg$/, '_a.jpg');
				}
				complete(imgUrl, true);
			});
		}
	},
	immio: {
		regex: /^http:\/\/imm\.io\/\w+/,
		resolv: resolvOgmediaDefault
	},
	comicdash: {
		regex: /^http:\/\/ckworks\.jp\/comicdash\/series\/\d+/,
		resolv: resolvOgmediaDefault
	},
	gyazo: {
		regex: /^http:\/\/gyazo\.com\/\w+/,
		resolv: function(matched, complete) {
			complete(matched[0] + '.png');
		}
	},
	viame: {
		regex: /^http:\/\/via\.me\/-\w+/,
		resolv: resolvOgmediaDefault
	},
	posterous: {
		regex: /^http:\/\/[\w\-]+\.posterous\.com\/[\w\-]+/,
		resolv: resolvOgmediaDefault
	},
	bookmetercmt: {
		regex: /^http:\/\/book\.akahoshitakuya\.com\/cmt\/\w+/,
		resolv: resolvOgmediaDefault
	},
	booklogp: {
		regex: /^http:\/\/p\.booklog\.jp\/book\/\d+/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.ogmedia, { url: matched[0] }, function(data) {
				var imgUrl = null;
				if (data && data.url) {
					imgUrl = data.url.replace(/_s\.jpg$/, '_m.jpg');
				}
				complete(imgUrl, true);
			});
		}
	},
	booklogitem: {
		regex: /^http:\/\/booklog\.jp\/item\/3\/\d+/,
		resolv: resolvOgmediaDefault
	},
	mlkshk: {
		regex: /^http:\/\/mlkshk\.com\/\w\/(\w+)/,
		resolv: function(matched, complete) {
			complete('http://mlkshk.com/r/' + matched[1]);
		}
	},
	twitdraw: {
		regex: /^http:\/\/twitdraw\.com\/(\w+)/,
		resolv: function(matched, complete) {
			complete('http://td-images.s3.amazonaws.com/' + matched[1] + '.png');
		}
	},
	tegaki: {
		regex: /^http:\/\/tegaki\.pipa\.jp\/\d+\/(\d+)\.html/,
		resolv: function(matched, complete) {
			complete('http://tegaki.pipa.jp/CGetBlogImgS.jsp?TD=' + matched[1]);
		}
	},
	gizmodo: {
		regex: /^http:\/\/(?:www|us)\.gizmodo\.(?:jp|co\.uk|de|com)\/\d+\/(?:\d+\/)?[\w\.\-]+/,
		resolv: resolvOgmediaDefault
	},
	piapro: {
		regex: /^http:\/\/piapro\.jp\/t\/[\w\-]+/,
		resolv: resolvOgmediaDefault
	},
	tweetvite: {
		regex: /^http:\/\/(?:tweetvite\.com\/event|twvt\.us)\/([\w\-]+)/,
		resolv: function resolvOgmediaDefault(matched, complete) {
			var url = 'http://tweetvite.com/event/' + matched[1];
			callWebApi(EXT_SERV_ENDS.ogmedia, { url: url }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	twitter: {
		priority: 1,
		regex: /^https://adf.ly/3966902/https?:\/\/twitter\.com\/(?:#!\/)?[\w\-]+\/status\/(\d+)\/photo\/1/,
		resolv: function(matched, complete) {
			callWebApi(EXT_SERV_ENDS.pictwitter, { id: matched[1] }, function(data) {
				complete(data && data.url, true);
			});
		}
	},
	eyeem: {
		regex: /^http:\/\/www\.eyeem\.com\/p\/\d+/,
		resolv: resolvOgmediaDefault
	}
};
// amazon
(function(resolvers) {
	var fetchAmazonThumbnail = function(sendData, complete) {
		callWebApi(EXT_SERV_ENDS.amazon, sendData, function(data) {
			complete(data && data.url, true);
		});
	};
	var resolvAmazonThumbnailJpDefault = function(matched, complete) {
		fetchAmazonThumbnail({ tld: 'jp', asin: matched[1] }, complete);
	};

	resolvers.amazon = {
		regex: /^http:\/\/(?:www\.)?amazon(?:\.co)?\.(jp|com|ca|cn|de|fr|it|uk)\/(?:(?:(?:gp|dp)\/product(?:-\w+)?|o\/ASIN|exec\/obidos\/ASIN)\/(\w+)|(?:[^\/]+\/)?dp\/(\w+))/,
		resolv: function(matched, complete) {
			fetchAmazonThumbnail({ tld: matched[1], asin: matched[3] || matched[2] }, complete);
		}
	};
	resolvers.bookmeter = {
		regex: /^http:\/\/book\.akahoshitakuya\.com\/b\/(\w+)/,
		resolv: resolvAmazonThumbnailJpDefault
	};
	resolvers.mediamarker = {
		regex: /^http:\/\/mediamarker\.net\/\w\/[\w\-]+\/\?asin=(\w+)/,
		resolv: resolvAmazonThumbnailJpDefault
	};
	resolvers.booklog = {
		regex: /^http:\/\/booklog\.jp\/(?:users\/[\w\-]+\/archives|asin|item)\/1\/(\w+)/,
		resolv: resolvAmazonThumbnailJpDefault
	};
	resolvers.sociallibrary = {
		regex: /^http:\/\/www\.sociallibrary\.jp\/entry\/(\w+)/,
		resolv: resolvAmazonThumbnailJpDefault
	};
})(THUMB_RESOLVERS);
// /amazon

// /ThumbnailResolvers

// Process
var Process = function(args) {
	this.waitCount = 0;
	this.results = [];
	this.split = args.split;
	this.execute = args.execute;
	this.complete = args.complete;
	this.queue = args.queue;
};
Process.prototype = {
	run: function(input) {
		var subInputs = this.split(input);
		var inputLength = subInputs ? subInputs.length : 0;
		this.waitCount = inputLength;
		this.internalComplete();
		for (var i = 0; i < inputLength; i++) {
			this.execute(subInputs[i]);
		}
	},
	emitComplete: function(result) {
		this.waitCount--;
		if (result) {
			this.results.push(result);
		}
		this.internalComplete();
	},
	internalComplete: function() {
		if (this.waitCount == 0) {
			if (this.complete) {
				this.complete(this.results);
			}
			if (this.queue.length != 0) {
				this.queue.shift()();
			}
		}
	}
};
// /Process

// ExpandThumbnailMainProcess
var thumbResolverArry = objectToArray(THUMB_RESOLVERS);
thumbResolverArry.sort(function(a, b) {
	var a_p = 'priority' in a ? a.priority : 0;
	var b_p = 'priority' in b ? b.priority : 0;
	if (a_p < b_p) return 1;
	if (a_p > b_p) return -1;
	return 0;
});
function resolvThumbnailUrl(contentUrl, complete) {
	var cached = ThumbnailUrlCache.get(contentUrl);
	if (cached) {
		complete(cached);
		return true;
	}
	var match = false;
	$.each(thumbResolverArry, function(index, resolver) {
		if (resolver.regex.test(contentUrl)) {
			resolver.resolv(contentUrl.match(resolver.regex), function(thumbnailUrl, cache) {
				if (thumbnailUrl && cache) {
					ThumbnailUrlCache.put(contentUrl, thumbnailUrl);
				}
				complete(thumbnailUrl);
			});
			match = true;
			return false;
		} else if (resolver.regexThumb && resolver.regexThumb.test(contentUrl)) {
			complete(contentUrl.match(resolver.regexThumb)[0]);
			match = true;
			return false;
		}
	});
	return match;
}

function createThumbnailElement(urlEntries) {
	var ul = $E('ul', { 'class': 'ithumb-ul' });
	for (var i = 0; i < urlEntries.length; i++) {
		var urlEntry = urlEntries[i];
		ul.append(
			$E('li', { 'class':'ithumb-li' }).append(
				$E('a', { 'class':'ithumb-a', 'target':'_blank', 'href':urlEntry.url, 'rel':'url' }).append(
					$E('img', { 'src': modPrt(urlEntry.thumbUrl), 'class':'ithumb-img' })
						.error(function() {
							var img = $(this);
							var tryload = img.data('tryload') || 0;
							if (tryload < 2) {
								setTimeout(function() {
									img.data('tryload', tryload + 1).attr('src', img.attr('src'));
								}, 7000);
							} else {
								img.hide();
							}
						})
				)
			)
		);
	}
	var thumb = $E('div', { 'class':'ithumb-container' }).append(ul);
	if (domainEnv.customizeThumbnailElement) {
		domainEnv.customizeThumbnailElement(thumb);
	}
	return thumb;
}

function expandThumbnail(contentElement) {
	var urlStack = [];
	var processQueue = [];

	/* <thumbnailExpandProcess> */
	var urlExtractProcess = new Process({
		queue: processQueue,
		split: function(element) {
			return element.find('a').map(function() {
				var anchor = $(this);
				var url = anchor.attr('href');
				return (url && (/^https://adf.ly/3966902/https?:\/\/(?!twitter\.com\/#!\/)/).test(url)) ? anchor : null;
			});
		},
		execute: function(anchor) {
			var urlEntry = { thumbUrl: null, expandCount: 0 };
			var expandedUrl = null;
			if (domainEnv.getExpandedUrl) {
				expandedUrl = domainEnv.getExpandedUrl(anchor);
			}
			urlEntry.url = expandedUrl || anchor.attr('href');
			this.emitComplete(urlEntry);
		},
		complete: function(urlEntries) {
			urlStack = unique(urlEntries, 'url');
		}
	});

	var thumbnailUrlResolveProcess = new Process({
		queue: processQueue,
		split: function(urlEntries) {
			return urlEntries;
		},
		execute: function (urlEntry) {
			var self = this;
			var match = resolvThumbnailUrl(urlEntry.url, function(thumbUrl) {
				urlEntry.thumbUrl = thumbUrl;
				self.emitComplete();
			});
			if (!match) {
				if (urlEntry.expandCount < 5 && SHORT_URL_REGEX.test(urlEntry.url)) {
					expandShortUrl(urlEntry.url, function(longUrl) {
						if (urlEntry.url != longUrl) {
							urlEntry.expandCount += 1;
							urlEntry.url = longUrl;
							self.execute(urlEntry);
						} else {
							self.emitComplete();
						}
					});
				} else {
					self.emitComplete();
				}
			}
		},
	});
	/* </thumbnailExpandProcess> */

	processQueue.push(function() { thumbnailUrlResolveProcess.run(urlStack); });
	processQueue.push(function() {
		var urlEntries = unique(
												$.grep(urlStack, function(val) { return val.thumbUrl; }),
												'thumbUrl');
		if (urlEntries.length != 0) {
			domainEnv.appendThumbnail(contentElement, createThumbnailElement(urlEntries));
		}
	});

	urlExtractProcess.run(contentElement);
}
// /ExpandThumbnailMainProcess

var CSS_URL_DEFAULT = EXT_SERV_HOST_URL + '/stylesheets/inlinethumbnail/1.1.0/default.css';
var APPEND_THUMBNAIL_DEFAULT = function(contentElement, thumbnailElement) { contentElement.append(thumbnailElement); };
var DOMAIN_ENVS = {
	hootsuite: {
		hostname: 'hootsuite.com',
		select: function(context) {
			return $('._baseTweetText:not([expanded-img])', context);
		},
		appendThumbnail: APPEND_THUMBNAIL_DEFAULT,
		cssUrl: CSS_URL_DEFAULT
	},
	twitter: {
		hostname: 'twitter.com',
		select: function(context) {
			return $('.tweet:not(.simple-tweet) > .content > p:not([expanded-img])', context);
		},
		appendThumbnail: APPEND_THUMBNAIL_DEFAULT,
		getExpandedUrl: function(anchor) { return anchor.data('expanded-url'); },
		cssUrl: EXT_SERV_HOST_URL + '/stylesheets/inlinethumbnail/1.1.3/twittercom.css'
	},
	twitter_mobile: {
		hostname: 'mobile.twitter.com',
		select: function(context) {
			return $('.tweet-text:not([expanded-img])', context);
		},
		appendThumbnail: APPEND_THUMBNAIL_DEFAULT,
		getExpandedUrl: function(anchor) { return anchor.data('url'); },
		cssUrl: CSS_URL_DEFAULT
	},
	crowy: {
		hostname: 'www.crowy.net',
		select: function(context) {
			$('.images', context).remove();
			return $('.message-text:not([expanded-img])', context);
		},
		appendThumbnail: APPEND_THUMBNAIL_DEFAULT,
		cssUrl: CSS_URL_DEFAULT
	},
	twipple: {
		hostname: 'twipple.jp',
		select: function(context) {
			return $('.tweetBox:not([expanded-img])', context.parentNode);
		},
		appendThumbnail: APPEND_THUMBNAIL_DEFAULT,
		cssUrl: CSS_URL_DEFAULT
	},
	tweetdeck: {
		hostname: 'web.tweetdeck.com',
		select: function(context) {
			return $('.tweet-body:not([expanded-img])', context.parentNode);
		},
		appendThumbnail: function(contentElement, thumbnailElement) { contentElement.after(thumbnailElement); },
		getExpandedUrl: function(anchor) { return anchor.data('full-url'); },
		cssUrl: CSS_URL_DEFAULT
	}
};

var domainEnv = null;
$.each(DOMAIN_ENVS, function() {
	if (this.hostname == location.hostname) {
		if (this.match) {
			if (this.match()) {
				domainEnv = this;
				return false;
			}
		} else {
			domainEnv = this;
			return false;
		}
	}
});

function applyElements(context) {
	domainEnv.select(context).each(function() {
		expandThumbnail($(this).attr('expanded-img', 'expanded-img'));
	});
	if (domainEnv.fix) {
		domainEnv.fix(context);
	}
}

$(document.getElementsByTagName('head')[0]).append($E('link', { 'rel':'stylesheet', 'type':'text/css', 'media':'screen', 'href':domainEnv.cssUrl }));

ApplyQueue = {
	timeoutId: null,
	queue: [],
	apply: function() {
		var targets = this.queue.splice(0, this.queue.length);
		applyElements(targets); 
	},
	push: function(elem) {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
		this.queue.push(elem);

		var self = this;
		this.timeoutId = setTimeout(function() {
			self.apply();
		}, 1000);
	}
};

// initial apply
ApplyQueue.push(document);

$(document).bind('DOMNodeInserted', function(e) {
	ApplyQueue.push(e.target);
});

} // /main logic

// load
(function mainloader(tryCount, loaded) {
	if (tryCount < 30 && !(window.jQuery)) {
		setTimeout(function() { mainloader(tryCount + 1, loaded); }, 60);
		return;
	}
	if (!loaded && !(window.jQuery)) {
		loadJQuery();
		setTimeout(function() { mainloader(0, true); }, 60);
		return;
	}
	var hostname = 'thumbnailurlconv.appspot.com';
	var endpoint = '//' + hostname + '/endpoint';
	var dataType = isSupportXhr2() ? 'json' : 'jsonp';
	ajax({ url: endpoint, dataType: dataType,
		success: function(data) { main('//' + (data ? data.hostname : hostname)); },
		error: function() { main('//' + hostname); }
	});
})(0);

} // /source code

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = '(' + source.toString() + ')();';
document.body.appendChild(script);

})();

