// ==UserScript==
// @name           Youtube Pause if Unfocused
// @description    Prevents videos from autoplaying and plays once tab is switched to; modifies "Youtube Autopause" by extent
// @namespace      http://userscripts.org/scripts/show/73105
// @include        http*://*.youtube.*/watch*
// ==/UserScript==

var PAUSED = 2;
var delay = ((window.location.href.search(/\#a?t\=/gi) == -1) ? 0 : 1000); // if URL links to specific time, delay pausing to let it seek

var playerElement = document.getElementById('movie_player');
if (!playerElement) return;
var player = playerElement.wrappedJSObject; // unsafeWindow context

var intID = setInterval(pauseIfUnfocused, 100);

function pauseIfUnfocused() {
	
	var tabFocused = document.hasFocus();
	
	if (tabFocused || player.getPlayerState() == PAUSED)
		clearInterval(intID);
	
	else if (!tabFocused) {
		window.addEventListener("focus", playWhenFocused, false); // play when tab is switched to
		var pauseTimeout = setTimeout(pause, delay); // player.pauseVideo() doesn't work here for some reason
	}
	
}

function playWhenFocused() {
	
	window.removeEventListener("focus", playWhenFocused, false);
	var playTimeout = setTimeout(play, delay);
	
}

function pause() {

	player.pauseVideo();
	
}

function play() {

	player.playVideo();
	
}