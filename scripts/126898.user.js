// ==UserScript==
// @name           Facebook Direct Links
// @description    Remove the redirect page from Facebook's external links
// @author         Phillip Berndt
// @namespace      http://www.pberndt.com/
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        1.0
// ==/UserScript==

(function() {

document.addEventListener("DOMNodeInserted", function(e) {
	if(typeof e.srcElement.getElementsByTagName == "undefined") return;
	var children = e.srcElement.getElementsByTagName("A");
	for(var i=0; i<children.length; i++) {
		if(children[i].target == "_blank") {
			children[i].onmousedown = function() { return true; };
		}
	}
}, false);

var children = document.getElementsByTagName("a");
for(var i=0; i<children.length; i++) {
	if(children[i].target == "_blank") {
		children[i].onmousedown = function() { return true; };
	}
}

})();