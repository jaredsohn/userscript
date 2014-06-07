// ==UserScript==
// @name           SB Auto Refresh
// @namespace      swagbucks.com
// @include        http://player.swagbucks.*
// ==/UserScript==

if (window == window.top)
{
	window.addEventListener("load", function() {
		alert(window.onsbtbAjaxCallback);
		onsbtbAjaxCallback = function() { window.location.reload(); };
	});
}