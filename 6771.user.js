// MailTo Confirm
// version 1.0
// 2006-12-10
// Copyright (c) 2006, Adam Szatrowski
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MailTo Confirm
// @description   Adds a confirmation dialog before opening mailto: links.
// @include       *
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (i = 0; i < links.length; i++) {
	if (links[i].href.toLowerCase().indexOf('mailto:')==0) {
		links[i].href="javascript:if(confirm(\"Create new mail message to \\\""+links[i].href.substring(7)+"\\\"?\")){javascript:location.href=\""+links[i].href+"\";}";
	}
}
