// ==UserScript==
// @name          MultiFavorited
// @namespace      http://flatluigi.googlepages.com
// @description   Highlights multifavorited comments
// @include        http://www.metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

(function () {
	var searchPattern = "//span[@class='smallcopy']";
	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	var i;
	for (var class = null, i = 0; (class = options.snapshotItem(i)); i++) {	
		var oldMessage = class.innerHTML;
		var myMessage = oldMessage.replace("users marked this as favorite\"\>", "users marked this as favorite\"\>\<font color=#ff33cc\>");
		class.innerHTML = myMessage;
	}	
})();
	