// ==UserScript==
// @name          Mischak Mahur Clips
// @namespace     Jillian
// @description	  Enables video clips of Mischak Mahur on Walla! VOD (v1.1)
// @include	      http://mahur.walla.co.il/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------

var obj = document.getElementById("itemPlayer");
if (obj) {
    var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Walla's custom Media Player interface
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "video/x-ms-asf";
    newObj.height = 320;
    newObj.width = 320;
    newObj.data = url;

    newDiv.appendChild(newObj);
}

