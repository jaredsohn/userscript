// ==UserScript==
// @name          DeviantART skip nag screen
// @namespace     http://henrik.nyh.se
// @description   Automatically skips the "Click here to continue to DeviantART" nag screen that non-paying users get. 
// @include       http://*deviantart.com*
// ==/UserScript==

function xps(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }

var nagLink = '//a[.= "Click here to continue to deviantART"]';
nagLink = xps(nagLink);

if (nagLink)
	location.replace(nagLink.href);  // Replace so that the nag screen is ignored by the back button