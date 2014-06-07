// ==UserScript==
// @name          Newzbin Site Link Referrer Block
// @namespace     http://blah.example/greasemonkeyscripts/
// @description   Adds a referrer spoofed link the post's URL field. This script depends on refspoof (http://refspoof.mozdev.org)
// @include       http://www.newzbin.com/browse/post/*
// ==/UserScript==

(function() {
	var xpathExpression = "//DIV[@id='Main']/DIV[@id='Content']/FORM/TABLE[1]/TBODY/TR[5]/TD[2]/A";
	var xpathResult = document.evaluate(xpathExpression, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE,null);
	var linkNode = xpathResult.singleNodeValue;	
	var newLinkNode = document.createElement("a");
	newLinkNode.href = linkNode.href.replace(/(h)tt(ps?:\/\/)/, "$1xx$2");
	newLinkNode.appendChild(document.createTextNode(" [x]"));
	linkNode.parentNode.insertBefore(newLinkNode, linkNode.nextSibling);
})();