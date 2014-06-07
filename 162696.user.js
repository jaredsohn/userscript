// ==UserScript==
// @name        Block Vault Popup
// @namespace   https://userscripts.org/users/5705
// @description Vau.lt pops up a window that insists you login, with no way to get rid of it. Until now.
// @updateUTL   https://userscripts.org/scripts/source/162696.user.js
// @include     http://www.vau.lt/*
// @include     https://www.vau.lt/*
// @include     http://*.vau.lt/*
// @include     https://*.vau.lt/*
// @run-at		document-start
// @version     1.1
// ==/UserScript==

var loc = window.location.href;
console.info( loc );
if ( ( loc.charAt(loc.length-1) !== "/" ) || ( loc === "/" ) ) {
	window.location.replace (window.location.href + "/");
}