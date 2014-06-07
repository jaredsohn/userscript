
// Mac Chrome Orangered Fixer
// version 1.0
// 2009-12-29
// Copyright (c) 2009, Will Brown
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
// @name          Mac Chrome Orangered Fixer
// @namespace     http://haldean.org
// @description   Fixes the envelope icon on Reddit to avoid that weird random bit error
// @include       http://*.reddit.com/*
// ==/UserScript==


var images = document.getElementsByTagName("img");
for (i in images) {
	if (images[i].src.match(/mailgray\.png$/)) {
		images[i].src = "http://haldean.org/images/mailgray.png";
	}
	else if (images[i].src.match(/mail.png$/)) {
		images[i].src = "http://haldean.org/images/mail.png";
	}
}