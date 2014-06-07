// ==UserScript==
// @name          FriendFeed lazyLoad
// @namespace     http://aliha.ir
// @description	  adding lazyLoad to friendfeed.
// @author        Aliha
// @homepage      http://aliha.ir
// @include       http*://friendfeed.com/*
// ==/UserScript==

// version 0.1

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	var lazyLoad = '<script src="http://www.appelsiini.net/projects/lazyload/jquery.lazyload.js" type="text/javascript" charset="utf-8"></script><script type="text/javascript" charset="utf-8">jQuery(document).ready(function($){$("img").lazyload({effect : "fadeIn"});});</script>';
	$('body').before(lazyLoad);
};