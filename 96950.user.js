//  Death to Cutesy Club for Conquer Club
//  version 1.0
//  2011-02-14
//  Copyright (c) 2011, Daniel Pavlyuchkov (dako.lrd@gmail.com)
//  Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name           Death to cutesty club
// @namespace      http://userscripts.org
// @version        1.0
// @include        http*://*conquerclub.com/*
// ==/UserScript==

var head = document.getElementsByTagName("head")[0];
for (var tagIndex in head.childNodes) {
    if (head.childNodes[tagIndex].nodeName == 'LINK') {
	    if (/cute/.test(head.childNodes[tagIndex].href)) {
		    head.childNodes[tagIndex].href = head.childNodes[tagIndex].href.replace('_cute', '');
		}
	}
}