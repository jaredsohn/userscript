// ==UserScript==
// @name           My Little Spoilers
// @namespace      http://www.reddit.com/r/mylittlepony/
// @description    Includes the spoiler thumbnail on /r/mylittlepony posts when browsing the front page.
// @author         badjokemostlikely
// @version        1.2
//
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
//
// @icon           http://i.imgur.com/ZzZRI.png
// @iconURL        http://i.imgur.com/ZzZRI.png
// @updateURL      http://bjml.com.ar/scripts/my_little_spoilers.user.js
// ==/UserScript==

var myLittleSpoilers = function(context) {
	var thumb;
	var subreddit;

	Array.prototype.slice.call(context.getElementsByClassName("over18"), 0).forEach(function(post) {
		subreddit = post.getElementsByClassName('subreddit').item(0);
		
		if (subreddit == 'http://www.reddit.com/r/mylittlepony/'
			|| subreddit == 'http://www.reddit.com/r/MLPLounge/') {
			// Hiding the big ugly NSFW stamp.
			var nsfwStamp = post.getElementsByTagName('acronym').item(0);
			
			nsfwStamp.innerHTML = 'SPOILER';
			nsfwStamp.setAttribute('style', 'border: #5F99CF 1px solid !important; color: #336699;');
			nsfwStamp.setAttribute('title', '');
			
			// Changing the thumbnail
			thumb = post.getElementsByClassName('thumbnail').item(0);
			thumb.style.backgroundImage    = "url(http://thumbs.reddit.com/t5_2s8bl_35.png)";
			thumb.style.backgroundPosition = "0 0";
		}
	});
}

if (window.location.href.match(/(\.com\/?|\.com\/\?(.+)?)$|(\/r\/(all|random|friends|Dashboard))|\/user\//g)) {
	document.addEventListener('DOMNodeInserted', function (event) {
		if (event.target.nodeType == Node.ELEMENT_NODE && event.target.className.indexOf('sitetable') >= 0) {
			myLittleSpoilers(event.target);
		}
	});

	myLittleSpoilers(document);
}
