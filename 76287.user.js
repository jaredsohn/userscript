// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          Facebook Like bypass
// @namespace     http://userscripts.org/scripts/show/76287
// @description   Bypassing the need to click "Like" 
// @include       http://www.facebook.com/pages/*
// @include       http://www.facebook.com/?ref=*/pages/*
// @version       0.1
// ==/UserScript==

// Developer Notes:
// Written by : Zophiel
// Summery : Install and all the pages links we be presented to you WITHOUT liking them :P
//           Currently, Only work when you open in new tab.
// Changes :
//           08/05/10
//           First release.
//

for (i in x=document.getElementsByTagName("span"))
	if(x[i].style.visibility=="hidden")
		void(x[i].style.visibility="visible")
