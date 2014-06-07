// ==UserScript==
// @name		Something Awful Forums - AdStripper
// @description		Gets rid of the registration ad for the Something Awful Forums
// @include 		http://forums.somethingawful.com/*
// ==/UserScript==

(function()
{
	window.addEventListener("load", function(e) {
		document.getElementsByTagName("table")[7].innerHTML = "";
	}, false);
})();
