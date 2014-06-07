// ==UserScript==
// @name          wiki-clean
// @namespace     http://userscripts.org/users/303498
// @description   Cleans up wikipedia's junk, like the silly nav menu.
// @include       http://www.wikipedia.com/*
// ==/UserScript==

winndow.parse = function() {
	var divCollection = document.getElementsByTagName("div");
	for (var i=0; i<divCollection.length; i++) {
		if(divCollection[i].getAttribute("id") == "content") {
			findMeText = divCollection[i].innerHTML;
			document.write(findMeText);
		} 
	}
}

window.setTimeout("parse()", 1000);
