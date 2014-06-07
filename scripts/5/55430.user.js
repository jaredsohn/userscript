// ==UserScript==
// @name totlol.com Stop Nagging Me! 
// @namespace  http://userscripts.org/users/cyber9
// @description  Hides the "You are expected to become a member by paying membership fees" nag and stops the page from moving up and down every 2 seconds.
// @include http://www.totlol.com/*
// ==/UserScript==

var nag = document.evaluate("//*[@class='notebar']",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
nag.style.display='none'