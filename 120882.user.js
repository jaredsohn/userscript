// ==UserScript==
// @name           Youtube Autostop
// @description    Quick hack to prevent youtubes from auto-playing (based on http://userscripts.org/scripts/show/73105)
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

var player = document.getElementById('movie_player');
if (!player) return;
var uwPlayer = player.wrappedJSObject; // unsafeWindow context

var intID = setInterval(YPause, 100);

function  YPause() {
var prestate = uwPlayer.getPlayerState();
if(prestate != 2) { 
	uwPlayer.pauseVideo();
} else {
	clearInterval(intID);
}

}