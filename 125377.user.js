// ==UserScript==
// @name           Widen Robot Unicorn Attack Evolution
// @namespace      http://www.endoftheinter.net/
// @description    Lets you see RUAE in widescreen (hopefully)
// @include        https://apps.facebook.com/ruaevolution/
http://apps.facebook.com/ruaevolution/
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