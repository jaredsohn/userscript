// ==UserScript==
// @name           Increase Amazon UK/US central window size.
// @namespace      AmazonMagnifier
// @include        http://amazon.co.uk/*
// @include        http://*.amazon.co.uk/*
// @include        https://amazon.co.uk/*
// @include        https://*.amazon.co.uk/*
// @include        http://amazon.com/*
// @include        http://*.amazon.com/*
// @include        https://amazon.com/*
// @include        https://*.amazon.com/*
// ==/UserScript==

var xpathResult = document.evaluate('//div[@id="leftcol"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
xpathResult.singleNodeValue.style.display='none';
var xpathResult = document.evaluate('//div[@id="rightcol"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
xpathResult.singleNodeValue.style.display='none';