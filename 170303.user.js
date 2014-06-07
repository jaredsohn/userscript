// ==UserScript==
// @name           YouTube left sidebar
// @description    ***
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @include        http*://*.youtube.com/*
// @version        1.0
// ==/UserScript==

main();

function main() {
	console.log("youtube sidebar start");
	var guideItem = document.getElementsByClassName("guide-item");
	console.log(guideItem.length);
	for (var i = 0; i<guideItem.length; i++) {
		//console.log("/user/" + guideItem[i].title + "/videos");
		guideItem[i].href = "/user/" + guideItem[i].title + "/videos";
	}
	console.log("youtube sidebar finish");
}