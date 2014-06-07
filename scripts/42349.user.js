// ==UserScript==
// @name           No Retweets
// @namespace      benhull.info
// @description    Hide all retweets for a more personal twitter. Requires jQuery
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        scanForReTweets();
    }
}
GM_wait()

function scanForReTweets() {
	$('span.entry-content').each(function(){
		if ($(this).text().match(/^RT\s*@/)) $(this).parents('li.status').hide();		
	})
}
