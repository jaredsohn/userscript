// ==UserScript==
// @name			Edit Favstar Menu
// @author			Ludvig Lindblom (@ItsOkBlameMe on twitter)
// @namespace		http://addons.internuts.se/edit-favstar-menu/
// @description		This addon brings back the original menu items for the "New" and "Rising" Leaderboards on favstar.fm
// @version			1.0
// @include			http://favstar.fm/*
// @include			https://favstar.fm/*
// @include			https://www.favstar.fm/*
// @include			http://www.favstar.fm/*
// ==/UserScript==

var $;
// Add jQuery
(function(){
	if(typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	var pathname = window.location.pathname;
	if(pathname == "/") {
		$("#sorterOptions").html('<a class="orderButtonSelected" href="/">Popular</a><a class="orderButton" href="/nsfw/30stars">Rising</a><a class="orderButton" href="/nsfw/10stars">New</a><div class="header_divider">&nbsp;</div><a class="orderButton" href="/tweets/popular">All Time</a><a class="orderButton" href="/popular-on-twitter-by-tweets-with-50-favorites">People</a><a class="orderButton" href="/best-tweet-of-the-day">Of the day</a>');
	} else if(pathname == "/nsfw/30stars") {
		$("#sorterOptions").html('<a class="orderButton" href="/">Popular</a><a class="orderButtonSelected" href="/nsfw/30stars">Rising</a><a class="orderButton" href="/nsfw/10stars">New</a><div class="header_divider">&nbsp;</div><a class="orderButton" href="/tweets/popular">All Time</a><a class="orderButton" href="/popular-on-twitter-by-tweets-with-50-favorites">People</a><a class="orderButton" href="/best-tweet-of-the-day">Of the day</a>');
	} else if(pathname == "/nsfw/10stars") {
		$("#sorterOptions").html('<a class="orderButton" href="/">Popular</a><a class="orderButton" href="/nsfw/30stars">Rising</a><a class="orderButtonSelected" href="/nsfw/10stars">New</a><div class="header_divider">&nbsp;</div><a class="orderButton" href="/tweets/popular">All Time</a><a class="orderButton" href="/popular-on-twitter-by-tweets-with-50-favorites">People</a><a class="orderButton" href="/best-tweet-of-the-day">Of the day</a>');
	} else if(pathname == "/tweets/popular") {
		$("#sorterOptions").html('<a class="orderButton" href="/">Popular</a><a class="orderButton" href="/nsfw/30stars">Rising</a><a class="orderButton" href="/nsfw/10stars">New</a><div class="header_divider">&nbsp;</div><a class="orderButtonSelected" href="/tweets/popular">All Time</a><a class="orderButton" href="/popular-on-twitter-by-tweets-with-50-favorites">People</a><a class="orderButton" href="/best-tweet-of-the-day">Of the day</a>');
	} else if(pathname == "/popular-on-twitter-by-tweets-with-50-favorites") {
		$("#sorterOptions").html('<a class="orderButton" href="/">Popular</a><a class="orderButton" href="/nsfw/30stars">Rising</a><a class="orderButton" href="/nsfw/10stars">New</a><div class="header_divider">&nbsp;</div><a class="orderButton" href="/tweets/popular">All Time</a><a class="orderButtonSelected" href="/popular-on-twitter-by-tweets-with-50-favorites">People</a><a class="orderButton" href="/best-tweet-of-the-day">Of the day</a>');
	} else if(pathname == "/best-tweet-of-the-day") {
		$("#sorterOptions").html('<a class="orderButton" href="/">Popular</a><a class="orderButton" href="/nsfw/30stars">Rising</a><a class="orderButton" href="/nsfw/10stars">New</a><div class="header_divider">&nbsp;</div><a class="orderButton" href="/tweets/popular">All Time</a><a class="orderButton" href="/popular-on-twitter-by-tweets-with-50-favorites">People</a><a class="orderButtonSelected" href="/best-tweet-of-the-day">Of the day</a>');
	}
}