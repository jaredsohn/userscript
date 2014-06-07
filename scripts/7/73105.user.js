// ==UserScript==
// @name           Youtube Autopause
// @description   Quick hack to try and prevent youtubes new 2010 layout from auto-playing
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