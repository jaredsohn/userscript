// ==UserScript==
// @name           Subreddit Linker
// @namespace      com.reddit.subredditLinker
// @description    This script adds links to subreddits when they are mentioned, but not linked to.
// @include        http://*.reddit.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        0.4
// ==/UserScript==

var ps = $('div .md p');
for(var i = 0, len = ps.length; i < len; ++i){
	ps[i].innerHTML = ps[i].innerHTML.replace(/[\s^]\/r\/\w+(?=[^<])/g, function(sub){
		return sub.replace(/\S+/g, '<a href="' + sub + '" rel="nofollow">' + sub + '</a>');
	});
}
ps = null;
