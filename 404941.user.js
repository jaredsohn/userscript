// ==UserScript==
// @name           test
// @description    test
// @namespace      http://www.risingcities.com/?action=internalGame*
// @include        http://www.risingcities.com/?action=internalGame*
// @version        0.1
// @author         rolls
// ==/UserScript==


$_jq(document).ready(function() {
	var jQuery = $_jq;
	
	/*
	 * Zoom
	 */
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheel, true);
	}
	
	window.onmousewheel = document.onmousewheel = wheel;