// ==UserScript==
// @name           Digg article direct access v1.1
// @description    Get ride of that digg page with comments and go to the original article
// @version 1.1
// @include        http://*.digg.com/*/*
// @include        http://digg.com/*/*
// ==/UserScript==
(function () {
	if (history.length == 0) {
		document.location.href=document.getElementById("title").getElementsByTagName("a")[0];
	}
})();
