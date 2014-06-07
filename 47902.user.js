// ==UserScript==
// @name           Search Aid
// @namespace      Search Aid
// @description    Basic script only operating when on the nbf search results page
// @include        http://www.notebookforums.com/search.php?searchid*
// ==/UserScript==
var main = function() {
	alert("Script Operating!");
	var allLinks = document.links;
	var urlRegex = /post/g;
	const urlPostMatch = "http://www.notebookforums.com/post";
	for (var i = allLinks.length - 1; i >= 0; i--) {
		var elmLink = allLinks[i];
		if (elmLink.getAttribute('href').match("#post") != null) {
			GM_openInTab(elmLink.href);
		} 
	}
}

main();