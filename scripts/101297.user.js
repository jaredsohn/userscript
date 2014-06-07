// ==UserScript==
// @name           Force HTTPS for Googles, Foursquare and Dropbox
// @description    Force ssl connection for google services, foursquare and Dropbox especially for Chinese users. // based on Force HTTPS for GMail, GCal, and GDocs script from Anmar Mansur
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
link = document.evaluate(".//a[starts-with(@href, 'http://foursquare.com/')]", gbar, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = link.href.replace(/^http:\/\//, "https://");
link = document.evaluate(".//a[starts-with(@href, 'http://dropbox.com/')]", gbar, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = link.href.replace(/^http:\/\//, "https://");
link = document.evaluate(".//a[starts-with(@href, 'http://dl.dropbox.com/')]", gbar, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = link.href.replace(/^http:\/\//, "https://");




}
