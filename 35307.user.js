// Remove the Advertisement on the Site esl.eu for free user
// version 0.1 BETA!
// 2008-10-11
// Copyright (c) 2008, blackJ0 (blackJ0.wordpress.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name iNputLink 2 rEalLink
// @namespace http://diveintogreasemonkey.org/download/
// @description Converts a link in editbox to a real clickable link
// @include *
// ==/UserScript==

var o = document.getElementsByTagName("input");

var regexp = /^((ht|f)tp(s?)\:\/\/|~\/|\/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?((\/?\w+\/)+|\/?)(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?/;
					
for(var i=o.length-1; i>=0; i--) {
	if((o[i].type == "text") && regexp.test(o[i].value)) {
		var a = document.createElement("a");
		a.href = o[i].value;
		var text = document.createTextNode(o[i].value);
		a.appendChild(text);
		o[i].parentNode.replaceChild(a, o[i]);
	}
}