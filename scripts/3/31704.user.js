// Released under the GPL License v3.0
// http://www.gnu.org/copyleft/gpl.html
// version 1.5.1

// ==UserScript==
// @name		Remove Google Sponsored Links
// @namespace		tag:polyhelix.org, 2009-07-17 RemoveGoogleSponsoredLinks
// @description		Remove Google's Sponsored Links from your search results
// @include		http://*.google.com/*
// @include		http://google.com/*
// @exclude
// ==/UserScript==

var imgslinks = document.evaluate("//table[contains(@style, 'border-bottom: 1px solid rgb')]", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var sideslinks = document.evaluate("//table[@id='mbEnd']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var topslinks = document.evaluate("//div[@id='tads']", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if ( imgslinks )
	imgslinks.parentNode.removeChild( imgslinks );
if ( sideslinks )
	sideslinks.parentNode.removeChild( sideslinks );
if ( topslinks )
	topslinks.parentNode.removeChild( topslinks );
