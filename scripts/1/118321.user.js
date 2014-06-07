// ==UserScript==
// @name           ZDNet clickable background killer
// @namespace      http://garvinggarvin.com/monkies
// @description     I'm a nervous clicker: I click around in (seemingly) unused webpage spaces while I scan. ZDNet decided they couldn't do without an ad in my clickspace. No more. 
// @include        http://www.zdnet.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready( function() {
	$(".skinClick").remove();				// kill background lurker ad
});