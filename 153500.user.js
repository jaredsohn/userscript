// ==UserScript==
// @name           refresh misc
// @namespace      Moppymoppy
// @description    Refresh the misc section.
// @include        http://thelostrunes.com/game.php
// @include        http://www.thelostrunes.com/game.php
// ==/UserScript==

document.getElementById("right2").innerHTML += '<br /><a href="javascript: rightMenu(5);"><b>[Refresh Misc]</b></a>';