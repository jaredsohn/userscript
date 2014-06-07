// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Meta Refresh", and click Uninstall.
// 
// --------------------------------------------------------------------
// Taken from the successful example at http://dunck.us/collab/DisableAutoRefresh
// --------------------------------------------------------------------
// ==UserScript==
// @name          Ynet WWW
// @description   Transfers http://ynet.co.il/ to http://WWW.ynet.co.il/
// @description   by n0nick <sagiem@gmail.com>
// @include       http://ynet.co.il/
// @include       http://www.ynet.co.il/
// ==/UserScript==

document.location='http://www.ynet.co.il/home/0,7340,L-8,00.html';
