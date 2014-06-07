// ==UserScript==
// @name           FA Disable Confirmation Prompt
// @namespace      net.fa
// @description    Yes, I want to log out
// @include        http://*.furaffinity.net/*
// @include        https://*.furaffinity.net/*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function() {
	var anchorElem = document.getElementsByTagName("a");

	var i=0;
	for(i=0;i<anchorElem.length;i++) {
		var thisElem = anchorElem[i];
		if(thisElem.href.indexOf("logout") != -1) {
			thisElem.setAttribute("onclick", "");
			thisElem.setAttribute("id", "");
			break;
		}	
	}
});
