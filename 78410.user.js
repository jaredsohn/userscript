// ==UserScript==
// @name           DGS No Last Move Marker
// @namespace      http://softwareslave.com
// @description    Remove the last move marker from a game on DGS
// @include        http://www.dragongoserver.net/game.php?*
// ==/UserScript==
var img = document.getElementById('lastMove');
img.src=img.src.replace(/([wb])m.gif$/, '$1.gif');
