
// Israel Philately Web Site Fixer
// version 0.1
// 2011-03-19
// Copyright (c) 2011, Yossi Mesika
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Israel Philately Fixer
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   A script for fixing the appearance of Israel Philately site in Firefox and Chrome
// @include       http://israelphilately.org.il/*
// @include       israelphilately.org.il
// ==/UserScript==

var xpathResult = document.evaluate(
    '//table[@style="border: 1 solid #0A495F;"]', 
    document, 
    null, 
    XPathResult.ANY_TYPE,
    null
);

var tableElement = xpathResult.iterateNext();

if (tableElement) {
	var parentCENTER = tableElement.parentNode;
	var parentTD = tableElement.parentNode.parentNode;
	parentTD.replaceChild(tableElement, parentCENTER);
}
