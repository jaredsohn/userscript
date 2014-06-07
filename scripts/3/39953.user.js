// ==UserScript==
// @name           Hang The DJ
// @namespace      http://simplelogica.net/cajondesastre/hangthedj
// @description    Gets rid of blipfuckingfm / spotify on Twitter / 4Square
// @include        http://twitter.com/*
// @include        http://facebook.com/*
// @author				 mort (manuel@simplelogica.net)	
// @require	    	 http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        0.3
// ==/UserScript==
$(function() {
		$(":contains('http://blip.fm'), :contains('http://open.spotify.com'), :contains('http://4sq.com')").parent('li.status').hide();
		$(":contains('http://blip.fm'), :contains('http://open.spotify.com'), :contains('http://4sq.com')").parent('UIIntentionalStory_Body').hide();
});
