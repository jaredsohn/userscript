// Resizes the text in the top KOL menu pane, which can be hard
// to read in non-compact mode.
// Copyright (c) 2005, Phillip Bradbury, <phlipping@yahoo.com>
// http://phlip.lxhost.com/
//
// Released under the terms of the GNU General Public Licence (GPL)
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
// @name          KOL Topmenu Resizer
// @description	  Resizes the text in the KOL top menu pane
// @namespace     http://phlip.lxhost.com/
// @include       http://kingdomofloathing.com/topmenu.php*
// @include       http://*.kingdomofloathing.com/topmenu.php*
// @include       http://loathing2.com/topmenu.php*
// @include       http://*.loathing2.com/topmenu.php*
// ==/UserScript==

//normally I'd check both .cssRules (W3C standard) and .rules (IE non-standard),
//but since this is a Greasemonkey script I don't really care
if (document.styleSheets)
	for (i in document.styleSheets)
		if (document.styleSheets[i] && document.styleSheets[i].cssRules)
			for (j in document.styleSheets[i].cssRules)
				if (document.styleSheets[i].cssRules[j] && document.styleSheets[i].cssRules[j].selectorText && document.styleSheets[i].cssRules[j].selectorText.indexOf(".tiny") != -1)
					document.styleSheets[i].cssRules[j].style.fontSize = "15px";

// now resize the frame too
a = top.document.getElementsByTagName && top.document.getElementsByTagName("frameset");
if (a && a[1] && a[1].rows) a[1].rows = "65,*";
