// ==UserScript==
// @name           DS_Title
// @namespace      http://userscripts.org 
// @include        http://*.die-staemme.de/game.php*
// ==/UserScript==

window.addEventListener('load',function () {
parent.document.title = document.title;

 }, true)