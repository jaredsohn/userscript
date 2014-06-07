// ==UserScript==
// @name           Twitter: enable user RSS
// @version        1.0
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

	var screenname = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');
	var headtag = document.getElementsByTagName('head')[0];
	var linktag = document.createElement('link');
		linktag.href = 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name='+screenname;
		linktag.rel = 'alternate';
		linktag.title = 'Twitter RSS [' + screenname + ']';
		linktag.type = 'application/rss+xml';
		headtag.appendChild(linktag);