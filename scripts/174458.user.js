// ==UserScript==
// @name        YouTube Auto-HD-ifier
// @namespace   http://userscripts.org/
// @description This script auto-appends "&hd=1" to any youtube link visited. That's it.
// @include     *.youtube.com/watch*
// @exclude     *.youtube.com/watch*&hd=1
// @version     0.1
// @grant       none
// ==/UserScript==

var current_url = location.href;
var new_url = current_url + "&hd=1";

function switchPage(){
	window.location.replace(new_url);
}

switchPage();