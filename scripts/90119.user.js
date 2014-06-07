// ==UserScript==
// @name           Wide Robot Unicorn Attack
// @namespace      http://www.joshlange.net/
// @description    Lets you see robot unicorn attack in widescreen
// @include        http://apps.facebook.com/robotunicorn/play.html#access_token=112594238780474|2.eQdTri_vNkZrvtxZgz9K0Q__.3600.1289343600-707940874|eZ-z9PxzlEbHq8j1sYDE-gV-_lE&expires_in=4688
// ==/UserScript==

var height = 150;

function doWidenGame(e) {
	try {
		var viewportwidth = window.innerWidth - 12;
		var gameDiv = document.getElementById('gameSwf');
		var embedEles = gameDiv.getElementsByTagName('embed');
		var game = embedEles[0];
		game.setAttribute("width", viewportwidth);
		game.setAttribute("height", height);
		game.style.position = 'absolute';
		game.style.left = 0;
	} catch (e) {
	}
}

document.addEventListener('DOMNodeInserted', doWidenGame, false);