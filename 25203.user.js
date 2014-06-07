// Tapuz Redirector To Old Style
// version 0.1 TEST!
// 2008-04-14
// Copyright (c) 2008, Chevalier
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tapuz Redirector To Old Style", and click Uninstall.
//
// ----------------------------------------------------------------------------
// ==UserScript==
// @name           Tapuz Redirector To Old Style
// @namespace      TapuzForums
// @description    reset Tapuz's new site to old style
// @include        http://www.tapuz.co.il/forums2008/forumpage.aspx*
// ==/UserScript==

var href = window.location.href;
ix = href.indexOf('?');
var parm = "";
if (ix != -1) { 
    parm = href.substring(ix);
}

var parm1 = parm;
if (parm.substr(0, 9) == '?forumId=')  {
     parm1 = '?forum=' + parm.substring(9);
} 

window.location.href = 'http://www.tapuz.co.il/tapuzforum/main/forumpage.asp' + parm1;

// Changelog:
//  0.1 Initial version

//.user.js
