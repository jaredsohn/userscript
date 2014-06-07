
// MvnRepo-Mod
// version 1.0
// Wed, 18 Jun 2008 21:33:09
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
// select "Anti-Disabler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MvnRepo-Mod
// @namespace     http://javaguy.co.uk/projects/greasemonkey/
// @description   Change ibiblio FTP links to ibiblio mirror HTTP links
// @include       http://mvnrepository.com/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


var allLinks, thisLink;
allLinks = xpath('//a[@href]');
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
    var str = thisLink.href;
    var newStr = str.replace("ftp:\/\/ibiblio\.org\/pub\/packages", "http:\/\/mirrors\.ibiblio\.org\/pub\/mirrors");
    thisLink.href = newStr;
}

//
// ChangeLog
// 2008-06-18 - 1.0 - Gwyn - initial release
//
