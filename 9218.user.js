// ==UserScript==
// @name           WebCreme direct access v1.2
// @description    Get ride of WebCreme site presentation
// @version 1.2
// @include        http://webcreme.com/*/*/*
// @include        http://www.webcreme.com/*/*/*
// ==/UserScript==

(function () {
	if (history.length == 0) {
		document.location.href=document.getElementsByTagName("div")[3].getElementsByTagName("a")[0];
	}
})();
