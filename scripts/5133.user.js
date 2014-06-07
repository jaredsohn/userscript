// Fixes wireless settings page's "Apply" javascript function
// on D-Link Wireless APs so it forks in Firefox
// 2006-08-12
// Copyright (c) 2006, Martin Dengler <nosp@xades.com>
// http://www.xades.com
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
// @name DLink Wireless Settings Apply Fixer
// @description Fixes "Apply" button javascript on D-Link Wireless page
// @namespace http://www.xades.com
// @include http://*/h_wireless.html
// ==/UserScript==

function fix_anchors() {
	anchors = unsafeWindow.document.getElementsByTagName("a");
	for (i = 0; i < anchors.length; i++) {
		GM_log(i + ": " + anchors[i]);
		if (anchors[i].href && anchors[i].href == "javascript:send_request()") {
			anchors[i].href = 'javascript:get_by_id("apply").value = "1";form1.submit();';
		}
	}
}
window.onload="fix_anchors()";
fix_anchors();
GM_log("fix_dlink installed; " + unsafeWindow.document.getElementsByTagName("a").length + " anchors.");

 function new_send_request() { 
	alert("new request");
	 get_by_id("apply").value = "1";
	 form1.submit(); 
 }



