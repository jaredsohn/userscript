// ==UserScript==
// @name           Retweet Blocker
// @namespace      http://www.twitter.com
// @description    Hides all retweets
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==


function rt_block() {
	$('span.entry-content').each(function(){ if ($(this).text().match(/(^|[^0-9A-Za-z])+(RT|rt)($|[^0-9A-Za-z])+/)) $(this).parents('li.status').hide(); })
	setTimeout(rt_block, 5000)
}

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery;
		rt_block();
	}
}
GM_wait()