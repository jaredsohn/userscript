// Rewrites Google Reader's "Reader" icon in the top left of the webpage to be
// a link to the Google Reader's home landing page
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need google's Chrome or 
// Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Reader home page link
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Rewrites Google Reader's "Reader" icon in the top left of the webpage to be
//                a link to the Google Reader's home landing page
// @include       *google.com/reader*
// ==/UserScript==

var logo_link = document.getElementById("logo-link");
if ( null != logo_link) {
    logo_link.setAttribute("href","#overview-page")
    //alert("rewritten");
} else {
    //alert("not rewritten");
}

var goog_link = document.getElementById("gbql");
if ( null != goog_link){
    var wrpr = document.createElement("a");
    wrpr.setAttribute("href","#overview-page");
    var p = goog_link.parentNode;
    p.replaceChild(wrpr,goog_link);
    wrpr.appendChild(goog_link);
    goog_link.setAttribute("href","#overview-page")
    //alert("rewritten");
} else {
    //alert("not rewritten");
}
