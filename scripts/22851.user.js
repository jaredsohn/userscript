// ==UserScript==
// @name           Speedup Ajaxian.com
// @namespace      http://www.openjs.com/
// @description    Speedup the Ajaxian.com site by removing its backgrounds
// @include        http://ajaxian.com/*

//by Binny V A (http://www.openjs.com/)
// ==/UserScript==

(function() {
	document.getElementsByTagName("html")[0].style.background="none";
	document.getElementsByTagName("body")[0].style.background="none";
	document.getElementById("wrapper").style.background="none";
})()
