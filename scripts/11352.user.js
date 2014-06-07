// GmailFull
// version 1.0
// 2007-08-12
// Copyright (c) 2007, Shajith Chacko
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
// select "GmailFull", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GmailFull
// @namespace     http://mostlyyes.tumblr.com
// @description   Removes the new Gmail quota warning at the top of the page.
// @include       https://mail.google.com/*
// ==/UserScript==

function get(xpath) {
    var matches = document.evaluate(
				    xpath,
				    document,
				    null,
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				    null);
  
    var ret = [];	
    for (var i = 0; i < matches.snapshotLength; i++) {
	ret.push(matches.snapshotItem(i));
    }	
    return ret;
}


function doIt() {
  var theDiv = get("//div[@class='C_VERY_TOP_QUOTA_BAR C_WARNING_BAR']")[0];
  if(theDiv) {
    theDiv.style.display = "none";
  }
}

window.addEventListener("load", doIt, true);

//ChangeLog
//12th August 2007 : Initial release.
