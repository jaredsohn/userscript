// Gleemax Kill Splash
// version 0.3 BETA!
// 2008-04-09
// Copyright (c) 2008, Nathan Brown
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Gleemax Kill Splash", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gleemax Kill Splash
// @description   Removes the splash screen from all external Gleemax forum links.
// @include       http://*.gleemax.com/*
// ==/UserScript==

var a, links;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
	if (a.href.indexOf("leaving.php") != -1){
		a.href = a.href.substring(a.href.indexOf("=")+1,a.href.length);
		if (a.href.indexOf("%") != -1){
			var output = a.href;
			var binVal, thisString;
			var myregexp = /(%[^%]{2})/;
			while ((match = myregexp.exec(output)) != null
				&& match.length > 1
				&& match[1] != '') {
				binVal = parseInt(match[1].substr(1),16);
				thisString = String.fromCharCode(binVal);
				output = output.replace(match[1], thisString);
			}
			a.href = output;
		}
	}
}
