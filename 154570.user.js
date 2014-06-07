// ==UserScript==
// @name        SubredditDrama No-Participation Removal
// @namespace   subredditdrama
// @description Reformats no participation links into normal links.
// @include     *reddit.com/r/subredditdrama*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1.0
// ==/UserScript==

$("a").each( function(index) {
	this.href = this.href.replace("http://np.", "http://www.");
	this.href = this.href.replace("www.np.", "www.");
});