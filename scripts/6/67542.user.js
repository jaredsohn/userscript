// ==UserScript==
// @name           Ikariam Ar Board Stop Snow
// @namespace      vryko.ikariam
// @description    stop snow in ikariam argentine board
// @include        http://board.ar.ikariam.com/*
// @version        0.1
// ==/UserScript==


function stopsnow() { 
	if (window.snowtimer) clearTimeout(snowtimer); 
}
window.setTimeout(stopsnow(), 100);
