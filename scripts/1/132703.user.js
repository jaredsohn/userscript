// ==UserScript==
// @name           GoogleNoTabs
// @namespace      https://github.com/bmurphy1976/GoogleNoTabs
// @description    Prevent Google from opening a new tab when switching accounts
// @include        http://*.google.com/*
// @include        https://*.google.com/*
// ==/UserScript==

function onTimer() {
	var links = document.getElementsByClassName("gbmt");

	for (var i=0; i<links.length; i++) {
		var elem = links[i];

		if (elem.tagName != "A" && elem.getAttribute("target") != "_blank") {
			continue;
		}

		elem.setAttribute("target", "_parent");
	}
}

var timer = setTimeout(onTimer, 500)
