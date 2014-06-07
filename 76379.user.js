// ==UserScript==
// @name          FriendFeed EasySearch
// @namespace     http://aliha.com
// @description	  Searchbox and resualts at top of all pages in Friendfeed.
// @author        Aliha
// @homepage      http://aliha.com
// @include       http*://friendfeed.com/*
// ==/UserScript==

// version 0.1

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	var easy_search = '<div id="easysearch"><div id="showhide-es">Easy Search</div> <center><div id="easysearch-box" style="display: none;"><iframe src="http://friendfeed.com/search?q=easysearch&embed=1" frameborder="0" height="200" width="700"></iframe></div></center></div>';
	$('div#feed').before(easy_search);
}

$("#showhide-es").click(function () {
$("#easysearch-box").toggle(400);
});