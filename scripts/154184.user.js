// ==UserScript==
// @name           YouTube: Auto Pause Video On Tab/Window Change
// @include        http://www.youtube.com/watch*
// @version        1.0
// ==/UserScript==

var tog = document.getElementById('movie_player');
var obj = tog.wrappedJSObject || tog;
var pstate;

function pause() {
	if (obj.getPlayerState()==1) {
		pstate = 1;
	}
	else {
		pstate = 2;
	}
obj.pauseVideo(); 
}

function play() {
	if (pstate==1) {
		obj.playVideo();
	}
}

window.addEventListener("blur", pause, false);
window.addEventListener("focus", play, false);
//UNCOMMENT THE BELOW LINE TO PAUSE THE VIDEO WHEN SCROLLING (useful when you scroll down to check the comments/etc.)
//window.addEventListener("DOMMouseScroll", pause, false);