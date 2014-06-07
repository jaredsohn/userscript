// ==UserScript==
// @name          NoRoland / slashdot
// @namespace     http://davephp.net/
// @description   Hides Roland slashvertisements on slashdot
// @include       http://*slashdot.org/*
// @version       0.1
// @author        Dave (http://davephp.net/)
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "NoRoland / slashdot", and click Uninstall.
//
// --------------------------------------------------------------------


(function() {
    var find = "//div[@class='intro']";
    var result = document.evaluate(find, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var re = new RegExp('(primidi|Roland Piq|emergingtech)', 'g');

    for (var c = 0; c < result.snapshotLength; c++) {
        var txt = result.snapshotItem(c);

        if (txt.innerHTML.match(re)) {
            txt.innerHTML = 'Roland writes: This is a slashvertisement. Please ignore!';
            txt.parentNode.parentNode.style.MozOpacity = '0.20';
        }
    }
})();
