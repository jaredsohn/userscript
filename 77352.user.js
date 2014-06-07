// ==UserScript==
// @name           {deviantART} Show "Zoomed-In" (Full) Image First
// @namespace      http://wolfey.sillydog.org/
// @include        http://*.deviantart.com/art/*
// @exclude        http://*.deviantart.com/art/*offset=*
// ==/UserScript==

// [Last Updated] May 25, 2010

// =====================================================================
// =====================================================================
// Enable ECMAScript 5 Strict Mode

"use strict";

// Run the "onclick" attribute's code in the "zoomed-out" (preview)
// image; this will toggle it and show the "zoomed-in" (full) image in
// its place

location.href = "javascript:(" + function () {
	document.getElementById("gmi-ResViewSizer_img").onclick();
} + ")()";