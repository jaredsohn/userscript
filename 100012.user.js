// ==UserScript==
// @name           Block Meebo Bar
// @namespace      screw meebo
// @description    Blocks the annoying Meebo advertizing bar at the bottom of webpages.
// ==/UserScript==

var meeboBar = document.getElementById("meebo");
if (meeboBar)
	meeboBar.innerHTML= "" 