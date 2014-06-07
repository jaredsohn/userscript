// ==UserScript==
// @name           TechRepublic background-as-clickable-ad killer
// @namespace      http://garvinggarvin.com/monkies
// @description    I'm a nervous clicker: I click around in (seemingly) unused webpage spaces while I scan. TechRepublick decided they couldn't do without an ad in my clickspace. No more. Also gets rid of the more annoying ads.
// @include        http://www.techrepublic.com/blog/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready( function() {
	$("#mantle_skin .skinClick").remove();				// kill background lurker ad	
	
	$("#mantle_skin .contain .leader").remove();		// kill banner ad		
		
	$("#content .ad-marquee, #content .mpu").remove();	// kill sidebar main and backup ads

	$("div.bidwar").remove();							// kill sidebar text ads
});