// ==UserScript==
// @name           YouTube - Set Default Playback Quality & Auto Play Setting
// @namespace      YouTube
// @description    Youtube set your own default playback quality and autoplay.
// @include        htt*://*.youtube.com/*
// @grant		   none
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @icon           http://aux3.iconpedia.net/uploads/520882026785186105.png
// @version        1.0
// @encoding       UTF-8
// ==/UserScript==

/*
	Quality level:
	
      default
	  highres
	  hd1080
	  hd720
	  large
	  medium
	  small
*/
 
var quality = "hd1080";
var stopVideo = 1;

function init_() {
	if (document.getElementById("movie_player-flash") || document.getElementById("movie_player")) {
		var p = (document.getElementById("movie_player-flash")?document.getElementById("movie_player-flash"):document.getElementById("movie_player"));
		
		if (typeof p.stopVideo == 'function') {
			p.setPlaybackQuality(quality);
			if (stopVideo) 
				p.stopVideo();
		}
		
		else {
			setTimeout(function () {
				init_();
			}, 500);
		}
	}
}
init_();