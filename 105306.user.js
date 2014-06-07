// ==UserScript==
// @name		Witcoin Mouseover Info
// @namespace		http://www.exmosis.net/
// @description		Show how much replies and upvotes cost on mouseover
// @include		http://witcoin.com/*
// @include		http://*.witcoin.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Get costs from page
var reply_cost = $("div.costs div span.action:contains('reply:')").parent().children('.cost').text();
var upvote_cost = $("div.costs div span.action:contains('upvote:')").parent().children('.cost').text();

// Append costs to titles
$("a:contains('reply')").each(function() {
	$(this).attr('title',$(this).attr('title') + ': ' + reply_cost);
});
$('a.vote-up').attr('title', $('a.vote-up').attr('title') + ': ' + upvote_cost);
