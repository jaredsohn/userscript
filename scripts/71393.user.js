// ==UserScript==
// @name           tribalwars_Title-plapl
// @namespace      http://userscripts.org 
// @include        http://*.tribalwars.*/game.php*
// ==/UserScript==

window.addEventListener('load',function () {
parent.document.title = document.title;

 }, true)