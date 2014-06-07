// ==UserScript==
// @name			YouTube - Title Adder
// @namespace		youtube - title adder
// @description		Adds the title of a youtube video to its links
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version			0.4.1
// @resource		icon http://i.imgur.com/9J6Lz.png
// @include			*
// @exclude			http://*.youtube.com/*
// @exclude			http://youtube.com/*
// @exclude			https://*.youtube.com/*
// @exclude			https://youtube.com/*
// ==/UserScript==

$(document).ready(function() {
	init_cache()
	GM_registerMenuCommand('Change the amount of YouTube titles cached', change_cache_size)
	GM_registerMenuCommand('Show YouTube titles cached', show_cache);
	GM_registerMenuCommand('Reset cached YouTube titles', reset_cache);

	cache = JSON.parse(GM_getValue('cache'))
	icon = GM_getResourceURL('icon')

	$('a').each(function(index) {
		videohash = false

		if ($(this).attr('href')) {
			if ($(this).attr('href').search('youtu.be') > -1) {
				videohash = unescape($(this).attr('href')).match(/youtu\.be\/([A-Za-z0-9\-_]+)/)[1]
			} else if ($(this).attr('href').search('youtube.com/watch') > -1) {
				videohash = unescape($(this).attr('href')).match(/youtube\.com.*?(?:\?|&)v=([A-Za-z0-9\-_]+)/)[1]
			} else if ($(this).attr('href').search('youtube.com/v/') > -1) {
				videohash = unescape($(this).attr('href')).match(/youtube\.com\/v\/([A-Za-z0-9\-_]+)/)[1]
			}
		}

		if (!!videohash) {
			title = (typeof(cache[videohash]) !== 'undefined' ? cache[videohash] : null)
			addtitle($(this), videohash, title)
		}
	})
})

init_cache = function () {
	cache = (GM_getValue('cache') ? GM_getValue('cache') : '')

	if (cache == '') {
		GM_setValue('cache', '{}')
	}

	size = Object.size(cache)

	if (size === 0) {
		GM_setValue('cache', '{}')
	} else {
		maxlength = GM_getValue('maxlength')

		if (typeof(maxlength) === 'undefined') {
			maxlength = 100
			GM_setValue('maxlength', maxlength)
		}

		if (size > maxlength)
			GM_setValue('cache', '{}')
	}
}

Object.size = function(obj) {
	if (obj) {
		size = 0
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				size++
			}
		}
		return size
	} else {
		return 0
	}
}

change_cache_size = function() {
	maxlength = window.prompt('Enter the amount of YouTube titles you want to cache [current: ' + GM_getValue('maxlength') + ']')
	if (maxlength.match(/^[0-9]+$/i) && maxlength > 0) {
		GM_setValue('maxlength', maxlength)
	} else {
		alert('Invalid value, amount is unchanged')
	}
}

show_cache = function() {
	cache = JSON.parse(GM_getValue('cache'))
	GM_log('==== Cached YouTube titles are shown below: ====');

	for (key in cache) {
		GM_log('http://youtu.be/' + key + ' --> ' + (cache[key] === '' ? '[Deleted]' : cache[key]));
	}
	GM_log('==== ' + Object.size(JSON.parse(GM_getValue('cache'))) + '/' + GM_getValue('maxlength') + ' URLs are cached. ====');
}

reset_cache = function() {
	GM_setValue('cache', '{}')
}

addtitle = function(link, hash, videoname) {
	if (videoname == null) {
		GM_xmlhttpRequest ({
			method: 'GET',
			url: 'https://gdata.youtube.com/feeds/api/videos/' + hash,
			headers: {
				'User-Agent': 'monkeyagent'
			},
			onload: function (content) {
				try {
					videoname = content.responseText.match(/<title type='text'>(.*?)<\/title>/)[1]
					videoname = unescapeHTML(videoname)
				} catch(e) {
					videoname = ''
				}

				cache = JSON.parse(GM_getValue('cache'))
				cache[hash] = videoname
				GM_setValue('cache', JSON.stringify(cache))
				modify_link(link, videoname)
			}
		})
	} else {
		modify_link(link, videoname)
	}
}

modify_link = function(anchor, title) {
	img = $('<img/>').attr('src', icon).css('border-width', '0 0 0 0')
	title = (title === '' ? '[Deleted]' : title)

	if ((anchor.html() == '') || anchor.html().match('youtube.com') || anchor.html().match('youtu.be')) {
		anchor.html('')
		anchor.append(img)
		anchor.append(' ' + title)
	} else {
		inner = anchor.html()
		anchor.html('')
		anchor.append(img)
		anchor.append(' ' + inner)
	}

	anchor.html(unescapeHTML(anchor.html()))
	anchor.attr('title', title)
}

unescapeHTML = function(html) {
	return $('<div></div>').html(html).html()
}
