// ==UserScript==
// @name          Youtube Stopper
// @namespace     http://nmgod.com
// @description   Stops youtube videos from auto-playing (excluding playlists)
// @include        *.youtube.com/watch*
// @version        1.2
// @updateURL      http://userscripts.org/scripts/source/153284.meta.js
// @installURL     http://userscripts.org/scripts/source/153284.user.js
// @copyright     NMGod
// ==/UserScript==

var ExcludePlaylists = true;

if(ExcludePlaylists){
	if(window.location.href.search("list") == -1) {
		setTimeout(function() {
			document.getElementById("movie_player").stopVideo();
		}, 500);
	}
} else {
	setTimeout(function() {
		document.getElementById("movie_player").stopVideo();
	}, 500);
}