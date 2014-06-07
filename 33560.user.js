// WOW Forum Signature Remover
// version 0.1
// 2008-09-11
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
// select "WOW Forum Signature Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WOW Forum Signature Remover
// @namespace     http://www.dissensionguild.com
// @description   Removes user signatures on Blizzard Entertainment's World of Warcraft forums
// @include       http://forums.worldofwarcraft.com/*
// @include       https://forums.worldofwarcraft.com/*
// @include       http://forums.wow-europe.com/*
// @include       https://forums.wow-europe.com/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate("//div[@class='message-format']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
    
    thisDiv.innerHTML = thisDiv.innerHTML.split("<ins>", 1)
}
