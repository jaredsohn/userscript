// ==UserScript==
// @name           Wide Robot Unicorn Attack
// @namespace      http://www.joshlange.net/
// @description    Lets you see robot unicorn attack in widescreen
// @include        http://games.adultswim.com/fb-game-files/robotunicornattack/play_frame.html
// ==/UserScript==

var height = 150;

function doWidenGame(e) {
	try {
		var viewportwidth = window.innerWidth - 12;
		var gameDiv = document.getElementById('altFlashContent');
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