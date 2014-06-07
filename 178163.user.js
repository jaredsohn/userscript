// ==UserScript==
// @name           LinkedIn feed filter
// @description    Filters LinkedIn feed items based on regex.
// @namespace      smalltalk80.uiuc
// @include        *.linkedin.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var patterns = {
		"endorsed" : /\bendorsed\b/,
		"Skills" : /\bSkills\b/,
		"Languages" : /\bLanguages\b/,
		"anniversary" : /\banniversary\b/
	};

function showHideFeeds() {
	$("#my-feed-post li.feed-item").each(function() {
		var str = $(this).html();
		for (var key in patterns) {
			if (patterns[key].test(str)) {
				$(this).hide();
				break;
			}
		}
	});
}

function repeat() {
	showHideFeeds();
	setTimeout(repeat, 1000);
}

$(document).ready(function() {
	repeat();
});