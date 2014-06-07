// Mailman Discard Default// version 0.1// 2005-06-16// Copyright (c) 2005, Paul Smith// Released under the GPL license// http://www.gnu.org/copyleft/gpl.html//// --------------------------------------------------------------------//// This is a Greasemonkey user script.  To install it, you need// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/// Then restart Firefox and revisit this script.// Under Tools, there will be a new menu item to "Install User Script".// Accept the default configuration and install.//// To uninstall, go to Tools/Manage User Scripts,// select "Mailman Discard Default", and click Uninstall.//// --------------------------------------------------------------------
//
// If you're like me and you administer several Mailman lists, you
// usually spend a good deal of time discarding spam that's queued-up
// in the moderation database. I got tired of clicking on the "Discard"
// radio button for each message like a sucker, so I decided that they
// should be set to "Discard" by default instead of "Hold". Et voilÂ.//
// ==UserScript==// @name        Mailman Discard Default
// @namespace   http://info.cnt.org/~paul/greasemonkey/// @description set action radio button to "discard"// @include     http://*/mailman/admindb/*// ==/UserScript==

var allDiscards;

allDiscards = document.evaluate(
    "//input[@value='3' and @type='radio' and starts-with(@name,'senderaction')]", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

for (var i = 0; i < allDiscards.snapshotLength; i++) {
    var thisDiscard = allDiscards.snapshotItem(i);
    thisDiscard.checked = true;
}