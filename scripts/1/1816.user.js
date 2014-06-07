// ==UserScript==
// @name          Tapuz Icons
// @namespace     Jillian
// @description	  Enables the insertion of icons to messages on tapuz.co.il (v1.1)
// @include	      http://*.tapuz.co.il/*/Signs*New*.asp?*
// @include	      http://*.tapuz.co.il/*/lms_*New.asp?*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5.3+) user script.
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


unsafeWindow.InsertIcon = function InsertIcon (cod)
{
    var num, input, which, privateMsg = false;

    try {
        which = document.location.href.match(/Signs(\w+)New/)[1];
        num = document.location.href.match(/x=(\d+)/)[1]; // Is it a quick reply?
        input = opener.document.getElementById(which + num);
    } catch(e) {}

    if (!which) {  // Private message
        privateMsg = true;
        if (document.location.pathname.search("lms_emo_subject") != -1)
            which = "Subject";
        else
            which = "Content";
    }

    if (!input) {
        // Regular response or private message
        switch (which) {
        case "Content":
            input = opener.document.getElementsByTagName("textarea")[0];
            break;

	    case "Subject":
            input = document.evaluate(
    	        "//input[@name='subject' or @name='Subject']",
                opener.document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
            break;
       }
    }

    if (which == "Subject" && !privateMsg && (input.value.length + cod.length) > 35) {
        // message is Ein Makom Le'aykon Ze
        alert (unescape("%u05D0%u05D9%u05DF%20%u05DE%u05E7%u05D5%u05DD%20%u05DC%u05D0%u05D9%u05D9%u05E7%u05D5%u05DF%20%u05D6%u05D4"));
        return;
    }

    var pos = input.selectionStart;
    input.value = input.value.substring(0, pos) + cod
        + input.value.substring(pos);
    // Advancing the cursor so more icons can be inserted
    pos += cod.length;
    input.setSelectionRange(pos, pos);
};

unsafeWindow.setFocus = function setFocus() {
    opener.contWin = "";
    opener.subjWin = "";
};