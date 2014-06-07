// ==UserScript==
// @name           Everyoptions
// @namespace      Imperator&Wanted
// @include        http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

var NameAlly = document.getElementById("AllyData")getElementsByTagName('span')[3].innerHTML;
alert(NameAlly);
