// ==UserScript==
// @name           3sat-repair
// @namespace      binfalse.de
// @description    3sat mediathek is broken
// @include        http://www.3sat.de/mediathek/mediathek.php*
// ==/UserScript==

var player = document.getElementById ('Player1');
if (player)
	player.height = 250;
