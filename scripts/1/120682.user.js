// ==UserScript==
// @name           Facebook Ads Hider
// @author         Jose Luis Martin
// @namespace      http://joseluismartin.info
// @description    Hide Ads on Facebook
// @include        http://www.facebook.com/*
// @run-at         document-start
// 
// ==/UserScript==

if (document.addEventListener) {
	document.addEventListener("DOMNodeInserted", onNodeInserted, false);
}

// Event listener to hide ads containers
function onNodeInserted(event) {
	target = event.target;
	if (target.className == "ego_column") {
		hideElement(target);
	}
}

// trivial hide of ads container
function hideElement(elto) {
	elto.style.visibility = "hidden";
	elto.style.hight = "0px";
	elto.style.width = "0px";
}



