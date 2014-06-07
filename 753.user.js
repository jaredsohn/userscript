// Digg.com Re-Direct
// version 0.1
// 2005-06-02
// Copyright (c) 2005, Rich Manalang (http://manalang.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This script resides at http://manalang.com/greasemonkey/digg-redirect.user.js
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
// select "Digg.com Re-Direct", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Digg.com Re-Direct
// @description     Digg.com's feeds link back to their site instead of the site that they're pointing to.  This script will redirect the user to the targetted site that Digg is pointing to... making their feed links one click away from the Digg story.
// @namespace       http://manalang.com/greasemonkey
// @include         http://digg.com/*/*
// ==/UserScript==

function go_digg() {
	location.replace(document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/P[1]/STRONG[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);
};
window.addEventListener("load", function() { go_digg() }, false);//.user.js
