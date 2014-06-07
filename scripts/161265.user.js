// ==UserScript==
// @name	Separate New Tweets
// @namespace	
// @description	Adds a separator between old tweets and new teets on twitter desktop site.
// @author	Liece G
// @version	1.0
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include	http://twitter.com/*
// @include	https://twitter.com/*
// ==/UserScript==


$(".stream-container").delegate(".new-tweets-bar", "click", function() {
    $(".stream-items .Myseparator").remove();
    $(".stream-items").prepend('<li class="Myseparator"><div style="height:15px;"></div></li>')
});