// ==UserScript==
// @name        Auto Reload Ogame by Bluu StoriZ
// @description Reload pages every 5 minutes
// @include     *.ogame.gameforge.com*
    // @grant               none
// ==/UserScript==

// based on code by Bluu StoriZ
// and included here with his gracious permission

var numMinutes = 5;
window.setTimeout("document.location.reload();", numMinutes*60*1000);