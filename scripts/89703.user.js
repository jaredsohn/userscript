// Psycnet_to_Macquarie_Macquarie
//
// 7 April, 2011
// Jason Friedman
// www.curiousjason.com
//
// -----------------------
// This is a greasemonkey script that rewrites DOI links from psychnet to use Macquarie University's link
// resolver. This will only work from within campus / through the VPN / or if you log in.
// 
// This is designed to solve the problem that MQ's access to most psychology journals are through ovid 
// and not through psycnet.
//
// Shamelessly adapted from http://diveintogreasemonkey.org/download/rottenreviews.user.js
//
// ==UserScript==
// @name Psycnet_to_Macquarie
// @namespace http://www.curiousjason.com/greasemonkey/
// @description Rewrite DOI links on psycnet to use Macquarie University link resolver
// @include http://psycnet.apa.org/psycinfo/*
// @include http://psycnet.apa.org/journals/*
// @include http://psycnet.apa.org/*doi*
// ==/UserScript==

var links, a, dois;

links = document.evaluate(
    "//a[contains(@href, '/doi/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    a.href = 'http://hh9mg3rw5q.scholar.serialssolutions.com/?doi=' + a.href.substring(27);
}

dois = document.evaluate(
    "//ul[@id='doiNumberArea']/li[2]",    
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (dois != null) {
	var doilink = document.createElement('a');
	doilink.setAttribute('href','http://hh9mg3rw5q.scholar.serialssolutions.com/?doi=' + dois.snapshotItem(0).childNodes[0].nodeValue);
	doilink.appendChild(document.createTextNode('Link to fulltext via Macquarie Library'));
	dois.snapshotItem(0).parentNode.replaceChild(doilink,dois.snapshotItem(0));
}
