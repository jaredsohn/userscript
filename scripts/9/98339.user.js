// ==UserScript==
// @name           SoundCloud Hide Comments
// @namespace      schc
// @description    Hides player comments by default on Soundcloud
// @include        http://soundcloud.com/*
// @include        http://*.soundcloud.com/*
// ==/UserScript==

players = document.getElementsByClassName("player");

for(var p in players) {
	if(players[p].nodeName == 'DIV') {
		players[p].className += "no-comments";
	}
}