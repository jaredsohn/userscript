// ==UserScript==
// @name           UNACCEPTABLE Spoilers
// @namespace      http://www.reddit.com/r/adventuretime/
// @description    Includes the spoiler thumbnail on /r/adventuretime posts when browsing the front page.
// @author         MemeticOutlaw (adapted from My Little Spoilers by badjokemostlikely)
// @version        1.0
//
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// ==/UserScript==

var UnacceptableSpoilers = function(context) {
	var thumb;
	var subreddit;

	Array.prototype.slice.call(context.getElementsByClassName("over18"), 0).forEach(function(post) {
		subreddit = post.getElementsByClassName('subreddit').item(0);
		
		if (subreddit == 'http://www.reddit.com/r/adventuretime/') {
			// Hiding the big ugly NSFW stamp.
			var nsfwStamp = post.getElementsByTagName('acronym').item(0);
			
			nsfwStamp.innerHTML = 'SPOILER';
			nsfwStamp.setAttribute('style', 'border: #5F99CF 1px solid !important; color: #336699;');
			nsfwStamp.setAttribute('title', '');
			
			// Changing the thumbnail
			thumb = post.getElementsByClassName('thumbnail').item(0);
			thumb.style.backgroundImage    = "url(http://b.thumbs.redditmedia.com/6uBwazVuJENbMqFs.png)";
			thumb.style.backgroundPosition = "0 0";
		}
	});
}

if (window.location.href.match(/(\.com\/?|\.com\/\?(.+)?)$|(\/r\/(all|random|friends|Dashboard))|\/user\//g)) {
	document.addEventListener('DOMNodeInserted', function (event) {
		if (event.target.nodeType == Node.ELEMENT_NODE && event.target.className.indexOf('sitetable') >= 0) {
			UnacceptableSpoilers(event.target);
		}
	});

	UnacceptableSpoilers(document);
}