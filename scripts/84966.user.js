// ==UserScript==
// @name          Conquer Club - Vertical Map Align
// @namespace     http://userscripts.org/Foxglove
// @description   Valigns the map cell
// @include       http*://*conquerclub.com/game.php*
// ==/UserScript==

var mapCell = document.getElementById("map-cell");
mapCell.style.verticalAlign = "top";