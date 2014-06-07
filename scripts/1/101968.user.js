// ==UserScript==
// @name          Testing123
// @namespace     http://userscripts.org/
// @description	  Just goofin' around, testing things out
// @include       chrome-devtools://devtools/*
// ==/UserScript==

// For the curious: Sadly, this does *not* work.

(function() {
var css = "#elements-content {background: #111;}",
	head = document.getElementsByTagName("head")[0],
	node = document.createElement("style");		
	
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	head.appendChild(node); 
	console.log('done');
})();