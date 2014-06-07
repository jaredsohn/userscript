// ==UserScript==
// @name        lowestfirstbydefault
// @namespace   http://www.pureandapplied.com.au/greasemonkey/lowest
// @description redirects ebay searches so that they default to price plus shipping lowest
// @include     http*://*ebay*/sch/*
// @version     1
// @grant       none
// ==/UserScript==
var theurl = String(window.location.href);

//if there is already an order specified don't do anything
var patt = /_sop=/
isordered = theurl.match(patt);

if (isordered == null){
	//find the start of the search fields and insert the search order at the start
	//avoids weird results when you just browse a category
	var patt2 = /(.*html)\?*\&*(.*)/;
	var searchfields = theurl.match(patt2);
	window.location.href = searchfields[1] + "?" + "_sop=15&" + searchfields[2];
}