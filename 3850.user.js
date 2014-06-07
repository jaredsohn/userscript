// ==UserScript==
// @name          FunpicRemoveAds
// @namespace     http://congregatio.co.funpic.de
// @description	  removes ads from congregatio.co.funpic.de site
// @include       http://congregatio.co.funpic.de/*
// ==/UserScript==
// Notes:
// I wrote this script especially for our forum which is hosted on funpic.de.
// You may need to modify it for other websites.

/*  remove <script> from DOM */
var resultLinks = document.evaluate("//script[contains(@src,'http://media.funpic.de/')]", document, null, XPathResult.ANY_TYPE, null);
var thisElement = resultLinks.iterateNext(); 
var oldChild = thisElement.parentNode.removeChild(thisElement);

/* remove DHTML from DOM */
var res = document.evaluate("//div[contains(@class,'layer_main')]", document, null, XPathResult.ANY_TYPE, null);
var thisElement = res.iterateNext(); 
var oldChild = thisElement.parentNode.removeChild(thisElement);