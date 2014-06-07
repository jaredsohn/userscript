// ==UserScript==
// @name	      Yes TV Guide Links
// @namespace     Jillian
// @description	  v1.0 - Creates normal links for programs details.
// @include	      http://yestvguide.tv2day.co.il/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5) user script.
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


(function() {
    var res = document.evaluate("//a[contains(@href, 'LoadDetails')]", document, null, 6, null);
    for (var i = 0; i < res.snapshotLength; i++) {
        var link = res.snapshotItem(i);
        var mtch = link.href.match(/'(\d+)','([YN]*)','(\d*)'/); // IsMovie and nchtype may be omitted
        var pid = mtch[1];
        var IsMovie = mtch[2];
        var nchtype = mtch[3];
        link.href = "http://yestvguide.tv2day.co.il/Details.asp?pid=" + pid + "&IsMovie=" + IsMovie +  "&chtype=" + nchtype;
    }
}());
