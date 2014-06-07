// MoreIntelligentLife
// version 0.1 BETA!
// 2007-12-20
// Copyright (c) 2007, Srijith K. Nair
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MoreIntelligentLife", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MoreIntelligentLife
// @namespace     http://srijith.net/codes/greasemonkey/
// @description   View printer-friendly version of articles at MoreIntelligentLife.com
// @include       http://moreintelligentlife.com/*
// @include       http://www.moreintelligentlife.com/*
// ==/UserScript==

// Get the current window location
var curLoc = window.location.href;


// -----------------------------------------------------
// Redirect any article to corresponding print version
// -----------------------------------------------------
if (curLoc.indexOf('node') != -1) {
			var newLoc = curLoc.replace('node','print');
				window.location.replace(newLoc);
}

//
// ChangeLog
// 2007-12-20 - 0.1 - Initial Release
//

