// ==UserScript==
// @name           WikidotCleaner 0.2
// @description    Clean Wikidot websites of their advertisement material by hiding the upper and lower toolbars
// @include        http://*.wikidot.com/*
// ==/UserScript==

function ProcessPage() {
	if (document.querySelector("div.wd-adunit")) {
		var d = document.querySelectorAll("div.wd-adunit");
		for (var i=0; i < d.length; i++) {
			d[i].style.display = "none";
		}
	}
}

if (window == window.top)
	document.addEventListener("load", ProcessPage, true);