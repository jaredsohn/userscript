// ==UserScript==
// @name           Fark Same Window
// @namespace      http://www.prism.gatech.edu/~mflaschen3
// @description    Opens Fark's links to news stories in the same window by default
// @include        http://www.fark.com/cgi/comments.pl?IDLink=*
// ==/UserScript==

var newsLink = document.evaluate("//tr[@class='headlineRow']/td[1]/a",
				 document,
				 null,
				 XPathResult.ANY_UNORDERED_NODE_TYPE,
				 null).singleNodeValue;
newsLink.removeAttribute("target");
