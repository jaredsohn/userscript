// ==UserScript==
// @name           ScreenFluent direct access from feeds 1.0
// @description    access links directly from feeds
// @version 1.0
// @include        http://screenfluent.com/*/*
// @include        http://www.screenfluent.com/*/*
// ==/UserScript==

(function () {
	if (history.length == 0) {
		document.location.href=document.getElementById("fsc").getElementsByTagName("a")[0];
	}
})();
