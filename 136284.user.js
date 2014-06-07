// ==UserScript==
// @name        hide land stats TLR
// @namespace   thenoob
// @description hide your land stats
// @include     http://www.thelostrunes.com/game.php
// ==/UserScript==

var divHolder = document.getElementById("holder_left");
var divStats = document.getElementById("tilestats");
divHolder.removeChild(divStats);