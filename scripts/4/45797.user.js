// ==UserScript==
// @name           Remove New Journal Stuff
// @namespace      journals@kwierso.com
// @description    GB2OldWay
// @include        http://*.roosterteeth.com/members/journal/*
// @include        https://*.roosterteeth.com/members/journal/*
// @exclude        http://*.roosterteeth.com/members/journal/entry.php*
// @exclude        https://*.roosterteeth.com/members/journal/entry.php*
// ==/UserScript==

(function () {
	var sidebar = document.getElementById("pageContent").firstChild.firstChild.firstChild.firstChild
		.firstChild.firstChild.firstChild.firstChild.childNodes[2].getElementsByTagName("td")[0];
	sidebar.style.display = "none";
})();