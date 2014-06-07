// ==UserScript==
// @name LJ-Goat_Go_away
// @namespace userscripts.org
// @version 0.01
// @description Remove Annoying Goat-Times From LJ-Pages
// @include *livejournal.com*
// ==/UserScript==
var goat;
if (goat = document.getElementById('ljtime')) {
    goat.parentNode.removeChild(goat);
}