// ==UserScript==
// @name Reddit r/All Subreddit Hider
// @description Hides specific subreddits from r/all
// @include http://www.reddit.com/r/all
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var hiddenSubs = "gonewild,trees,circlejerk,reportthespammers";

$(document).ready(function() {
	$(".thing").filter(function() {
		return $.inArray( $(".subreddit", this).html(), hiddenSubs.split(",") ) != -1;
	}).hide();
});