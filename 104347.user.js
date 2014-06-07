// ==UserScript==
// @name           Google search result link fixer
// @namespace      net.aib42.userscripts
// @description    Prevents Google search result links from turning into redirector links when clicked
// @include        http://www.google.com.*
// ==/UserScript==

var allLinks = document.getElementsByTagName("a");

window.addEventListener("load", function() {
	for (var i in allLinks) {
		var classes = allLinks[i].getAttribute("class");
		
		if (classes != null && classes.split(" ").indexOf("l") != -1) {
			allLinks[i].setAttribute("onmousedown", null);
		}
	}
}, false);
