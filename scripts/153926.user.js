// ==UserScript==
// @name            YouTube HTML5 replace
// @namespace       Zentriple
// @description     Replaces YouTube flash video player with HTML5 in any page.
// @include         *
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version         1.5
// ==/UserScript==

pageurl = window.location.toString();

function isYoutubeLink(url) { return url.indexOf('www.youtube.com/') != -1; }

function getYoutubeID(url) {
	var start = url.indexOf('/v/');
	var stop = url.indexOf('&');

	if (stop == -1)
		stop = url.length;

	return url.substring(start + 3, stop);
}

function getYoutubeIDfromURL(url) {
	var start = url.indexOf('v=');
	var stop = url.indexOf('&');

	if (stop == -1)
		stop = url.length;

	return url.substring(start + 2, stop);
}

function replaceVideoHTML(element, height, width, vid, autoplay) {
	element.replaceWith('<iframe src="https://www.youtube.com/embed/'+vid+'?fs=1&autoplay='+autoplay+'" style="width:'+width+';height:'+height+';overflow:auto;" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
}

// Replace videos at youtube.com
if(isYoutubeLink(pageurl)) {
	flash = $('#movie_player');

	ytVideoID = getYoutubeIDfromURL(pageurl);
	
	var height = '100%';
	var width = '100%';
	
	replaceVideoHTML(flash, height, width, ytVideoID, 1);
} else {
	// Replace embedded videos
	$('object param[name="movie"]').each(function() {
		url = $(this).attr('value');
		// Object has to be an embedded YouTube video and not a video at youtube.com
		if (isYoutubeLink(url) && !isYoutubeLink(pageurl)) {
			ytVideoID = getYoutubeID(url);
			
			flash = $(this).parent('object');
			var height = flash.attr('height') + 'px';
			var width = flash.attr('width') + 'px';
			
			replaceVideoHTML(flash, height, width, ytVideoID, 0);
		}
	});
}
