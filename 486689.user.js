// ==UserScript==
// @name        Auto Reload bitcointalk.org by Bluu StoriZ
// @description Reload pages every 5 minutes
// @include     *bitcointalk.org*
    // @grant               none
// ==/UserScript==

// based on code by Bluu StoriZ
// and included here with his gracious permission

var numMinutes = 5;
window.setTimeout("document.location.reload();", numMinutes*60*1000);