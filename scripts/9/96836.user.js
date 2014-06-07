// ==UserScript==
// @name           restaurant.com yelp links 
// @description    Linking from Restaurant.com to Yelp 
// @namespace      smalltalk80.uiuc
// @include        http://*.restaurant.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
	$(".restaurant-address > .title").each(function() {
		var name = $("a", this).text().replace(/^\s+|\s+$/g, '');
		$(this).append("<a href='http://www.yelp.com/search?find_desc=" + encodeURIComponent(name) +"'><img src='http://media1.px.yelpcdn.com/static/201012161623981098/i/ico/favicon.ico'/></a>");
	});
	$("#restaurant-details > #information > .name").each(function() {
		var name = $(this).text().replace(/^\s+|\s+$/g, '');
		$(this).append("<a href='http://www.yelp.com/search?find_desc=" + encodeURIComponent(name) +"'><img src='http://media1.px.yelpcdn.com/static/201012161623981098/i/ico/favicon.ico'/></a>");
	});
});

