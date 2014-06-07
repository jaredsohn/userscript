// ==UserScript==
// @name           DSFARGEG
// @description    DSFARGEG
// @include        http://*.4chan.org/b/*
// ==/UserScript==

var music_only_on_frontpage = false;
document.title = "DSFARGEG";
GM_addStyle('body{background:#EEF2FF url(http://dj801.info/dsfargeg.gif) repeat;}');

var babby = document.getElementsByTagName("embed")[0];

if (!music_only_on_frontpage || !String(window.location).match("/res")) {
	if (babby) {
		babby.src = "http://www.poolsclosed.us/templates/DSFARGEG/dsfargeg-thunderdome-loop.swf";
	} else {
		var music = document.createElement('embed');
		music.src = "http://www.poolsclosed.us/templates/DSFARGEG/dsfargeg-thunderdome-loop.swf";
		music.width = "1";
		music.height = "1";
		music.setAttribute("wmode","transparent");
		document.getElementsByTagName("td")[1].appendChild(music);
	}
} else {
	if (babby) {
		babby.parentNode.removeChild(babby);
	}
}

//Removes all other .swf's off
var embers = document.getElementsByTagName('embed');
for (i=0; i<embers.length; i++) {
  if (embers[i].src='http://swf.4chan.org/*') {
    embers[i].src='null';
  }
}