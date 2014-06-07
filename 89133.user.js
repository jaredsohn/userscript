// ==UserScript==
// @name          Bar dynamique !
// @namespace     Bar dynamique !
// @description   Bar dynamique !
// @include       http://www.jeuxvideo.com/forums/1-10716-84417-*-0-1-0-le-bar-a-oncle-koopatox.htm
// ==/UserScript==

var time = 10000 // temps en millisecondes
window.setTimeout(function() {location.reload();}, time);