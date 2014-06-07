// ==UserScript==
// @name           fix links in youtube
// @namespace      http://makdaam.eu
// @include        http://www.youtube.com/*
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==


(function () {
	var links = document.document.getElementsByClassName("playnav-item-title ellipsis");
		
	for (i = 0; i < links.length; i++) {
		var node = links[i];
		var myLinks = node.getAttribute("href");
		
		if (tag) {
				node.onclick = undefined;
		}	// end if(tag)
	} // end for loop
})();
