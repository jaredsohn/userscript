// ==UserScript==
// @name           Reddit sans Voting
// @namespace      http://jobson.us
// @description    Removes voting from reddit.
// @include        http://www.reddit.com/*
// @exclude        http://www.reddit.com/comscore-iframe/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Your reputation
$($('span.user').contents()[3]).remove()
$($('span.user').contents()[2]).remove()
$($('span.user').contents()[1]).remove()

// Arrows
$('div.arrow').remove();

// Article Scores
$('div.score').remove();

// Add some padding.
$('span.rank').css('padding-right','10px');

// Up & Down votes messages
$('span.upvotes').remove();
$('span.downvotes').remove();

// User's comment scores
$('span.score').remove();

// Any comment mentioning upvote or downvote
var voteText = new RegExp('(up|down)\\s{0,1}vote','i');
$('div.entry div.md p').each(function() {
	if (! voteText.test($(this).html())) return;
	$(this).parents('div.entry').remove();
});
