// ==UserScript==
// @name       Remove stuff
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Remove shitty posts
// @match      https://forum.catto5k.com/1/epsilon-forum/*
// @copyright  2012+, Me
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
	jQuery("span.quote-user:contains('Loretta Lynn\'s Dead Baby')").parent().remove();
	jQuery("div.username:contains('Loretta Lynn\'s Dead Baby')").closest('div.row-post').remove();
	jQuery("button:contains('Toggle ignored post from Loretta Lynn\'s Dead Baby')").remove();
