// ==UserScript==
// @name          Yes TV Guide Search
// @namespace     Jillian
// @description	  Fixes search function of Yes TV Guide (v1.2).
// @include       http://yestvguide.tv2day.co.il/*
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

unsafeWindow.GotoSearchResults = function GotoSearchResults (searchStr) {
    if (!searchStr)
       searchStr = escape(document.getElementById("txtFreeSearch").value);
    else
       searchStr = escape(searchStr);

    if (searchStr=="") {
        // message is 'hazinu mila lehipus'
        window.alert(unescape("%u05D4%u05D6%u05D9%u05E0%u05D5%20%u05DE%u05D9%u05DC%u05D4%20%u05DC%u05D7%u05D9%u05E4%u05D5%u05E9"))
    }
    else {
        document.location.assign("SearchResults.asp?txtSearchEngine=" + searchStr);
    }
};

var srch = document.getElementById("txtFreeSearch"); // the search input
if (!srch) {return; }  // error in page
var td = srch.parentNode;
var form = document.createElement("form");

srch.removeAttribute("onkeypress");
form.addEventListener("submit", function(e) {e.preventDefault(); unsafeWindow.GotoSearchResults();}, true);
form.appendChild(srch);
td.appendChild(form);

var imgbtn = td.previousSibling.previousSibling; // It's actually a td element
imgbtn.style.cursor = "pointer";
