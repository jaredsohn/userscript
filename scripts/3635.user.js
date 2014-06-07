// ==UserScript==
// @name           Stylegala RSS link through
// @namespace      http://henrik.nyh.se
// @description    For Stylegala news links, follows the link automagically if you hit the news page from any page outside of that site (presumably a RSS reader).
// @include        http://www.stylegala.com/news/*/*
// ==/UserScript==

var link = "id('content')/div[1]/h4/a";
link = document.evaluate(link, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if (!document.referrer.match(/^http:\/\/(www.)?stylegala.com/))
	location.replace(link.href);