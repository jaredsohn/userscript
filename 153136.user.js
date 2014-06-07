// ==UserScript==
// @name			YouTube HTML5
// @version			45
// @description		Replaces YouTube flash video player with native HTML5 video tags.
// @include			http://www.youtube.com/watch?*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

var $flash = $("#movie_player");

var youtubeID = window.location.href.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^'&?\/ ]{11})/i)[1];

var $iframe = $("<iframe>");
$iframe.attr({
	class:			"youtube-player",
	type:			"text/html",
	width:			640,
	height:			390,
	src:			"http://www.youtube.com/embed/"+youtubeID+"?autoplay=1",
	frameborder:	0,
});

$flash.replaceWith($iframe);

console.log("Youtube video ["+youtubeID+"] replaced.");