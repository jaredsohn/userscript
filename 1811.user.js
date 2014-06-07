// ==UserScript==
// @name          Yes TV Guide IMDB Links
// @namespace     Jillian
// @description	  v1.0 - Adds an imdb link to the movie detail pages.
// @include	      http://yestvguide.tv2day.co.il/Details.asp*
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
    var res = document.evaluate(
            "//font[@size='2' and @color='#ff6633']", // The tag that holds the English name of the movie
            document, null, 6, null);
    if (res.snapshotLength == 0) {return; }

    var fontTag = res.snapshotItem(0);
    var txt = fontTag.textContent;
    var mtch = txt.match(/.+\|\s+(\d{4})?\s+\|\s+(.+?)\s+$/); // length | year | name - get year and name
    if (!mtch) {return; }
    var year = mtch[1];
    if (!year) {year=''; }
    var engName = mtch[2];

    var td = fontTag.parentNode.parentNode; // First parentNode is <b>
    var a = document.createElement("a");
    var img = document.createElement("img");
    img.src = "http://imdb.com/favicon.ico";
    a.href = "http://www.imdb.com/find?tt=on;mx=20;q=" + engName + " (" + year + ")" ;
    img.style.border = "0px";
    a.appendChild(img);
    td.appendChild(a);
}());
