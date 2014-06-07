// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the script name and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Meet In Boston RSVP Fix
// @namespace     http://neuralnexus.net/
// @description   Replace the no-escape RSVP Page with one that lets you navigate
// @include       http://www.meetin.org/RSVP.cfm?EID*
// ==/UserScript==

// convert URLs like http://www.meetin.org/RSVP.cfm?EID=94237&CID=24318&SID=25317
// to http://meetin.org/city/MEETinBOSTON/EventsDetails.cfm?EventsID=94237

window.location.href = window.location.href.replace
    (/http:\/\/www.meetin.org\/RSVP.cfm\?EID=(.+)\&CID=.+\&SID=.+/, 
      "http://meetin.org/city/MEETinBOSTON/EventsDetails.cfm?$1");
}
