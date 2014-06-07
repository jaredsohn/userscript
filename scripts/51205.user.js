// ==UserScript==
// @name           Tumblr es Retweet tilto script a Twitterhez
// @description    A script segitsegevel az osszes Tumblr link és Retweet (RT) eltunik
// @include        http://twitter.com/*
// @author	   bodzasfanta (bodzasfanta at gmail dot com)	
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        0.0.1
// ==/UserScript==
$(function() {
		$(":contains('http://tumblr.com'), :contains('http://www.tumblr.com'), :contains('RT')").parent('li.status').hide();
});