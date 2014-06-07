// CoH Forums Refresh
// v0.1
// 2011-12-12
// Copyright (c) 2009, NeoRavencroft - NeoRavencroft@pc-logix.com 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// You should configure the Included and Excluded pages in the GreaseMonkey 
//      configuration pane.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Efficient Refresher", and click Uninstall.
// For Google Chrome use https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
// Install Tamper Monkey, then revisit this page.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//  Automatically refreshes the City of Heroes forums to maintain your Session
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CoH Forums Refresh
// @namespace     http://pc-logix.com
// @description	  Automatically refreshes the CoH Forums every 4 hours to maintain your session.
// @version       0.1
// @date          2011-12-12
// @creator       NeoRavencroft(NeoRavencroft@pc-logix.com)
// @include	  http://boards.cityofheroes.com/
// @include       http://boards.coh.com/


// ==/UserScript==

setTimeout(function() { document.location.reload(); } , 14400000);
