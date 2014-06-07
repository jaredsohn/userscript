// ==UserScript==
// @name           GrinchPunch
// @namespace      Lexical
// @description    Removes the snow from facepunch
// @include        http://www.facepunch.com/*
// @include        http://facepunch.com/
// ==/UserScript==
var i, flake;
for (i = 0; i < 100; i++) {
	flake = document.getElementById("SNOW_flake"+i);
	flake.parentNode.removeChild(flake);
}