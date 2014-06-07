// ==UserScript==
// @name           GLB log you in, for the win
// @namespace      GLB
// @description    Logs you in if you keep your user/pass saved in your browser.
// @include        http://goallineblitz.com/game/login.pl*
// ==/UserScript==

window.setTimeout(function() { document.getElementsByTagName('input')[4].click() } , 500); // the 5th input tag is the login button, hence the [3]. 