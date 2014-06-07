// ==UserScript==
// @name           Mark Forum As Read and return to index
// @namespace      https://github.com/insin/greasemonkey
// @description    Returns you to the main index after marking a forum as read
// @include        http://www.rllmukforum.com/*
// @include        http://rllmukforum.com/*
// ==/UserScript==
var a = document.evaluate("//a[@title='Mark this forum as read']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null).singleNodeValue;
if (a) a.href = a.href.split("&").slice(0, -1).join("&");
