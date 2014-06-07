/*

Ferruh Mavituna
http://ferruh.mavituna.com

*/
// ==UserScript==
// @namespace     http://ferruh.mavituna.com
// @name          FM Fast Rapid
// @description   Fast downloads in rapidshare
// @include       http://rapidshare.de/*
// ==/UserScript==

// If have it submit !
	if(document.getElementsByTagName("input")[2])
		document.getElementsByTagName("input")[2].click();

// Skip seconds limitation
window.addEventListener(
	'load',
	function() {c=-1;},
	true
);