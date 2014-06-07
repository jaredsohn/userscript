// ==UserScript==
// @name	identi.ca Homepage
// @namespace	http://joemsmith.com
// @description	Change the identi.ca logo in the upper left to take you to your feed, rather than the default stream.
// @include	http://identi.ca/*
// @include	http://*.identi.ca/*
//
// ==/UserScript==

var theLink, link;
theLink = document.getElementsByClassName('url home bookmark')[0];
if (theLink) {
	theLink.href = "http://identi.ca/yasumoto/all"
}
