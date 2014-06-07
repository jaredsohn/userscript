// ==UserScript==
// @name           cssBeauty direct access from feeds 1.0
// @description    access links directly from feeds
// @version 1.0
// @include        http://cssbeauty.com/*/*/*/*
// @include        http://www.cssbeauty.com/*/*/*/*
// ==/UserScript==

(function () {
	if (history.length == 0) {
		document.location.href=document.getElementById("content").getElementsByTagName("a")[0];
	}
})();
