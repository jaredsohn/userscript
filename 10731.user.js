// ==UserScript==
// @name           Force HTTPS for GMail, GCal, and GDocs
// @description    Modify Google corner bookmarks to use HTTPS for GMail, GCal, and GDocs
// @include        http://*.google.com/*
// ==/UserScript==

var link;
var gbar = document.evaluate("//div[@id='gbar']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (gbar) {
	link = document.evaluate(".//a[starts-with(@href, 'http://mail.google.com/mail')]", gbar, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = link.href.replace(/^http:\/\//, "https://");
	link = document.evaluate(".//a[starts-with(@href, 'http://www.google.com/calendar')]", gbar, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = link.href.replace(/^http:\/\//, "https://");
	link = document.evaluate(".//a[starts-with(@href, 'http://docs.google.com/')]", gbar, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = link.href.replace(/^http:\/\//, "https://");
}
