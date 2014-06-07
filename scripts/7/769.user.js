// IGN Boards Killfile
// version 0.1
// 2005-06-08
// Copyright (c) 2005, Michael Stephens (michaeljs@gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// A simple GreaseMonkey user script to ignore posts of certain users on the IGN 
// message boards. To ignore a user, simply add them to the list below. If the
// script is already installed, this can be acomplished by going to 
// Tools->Manage Scripts, selecting the IGN Boards Killfile, and
// pressing the "Edit" button.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        IGN Boards Killfile
// @namespace   http://mikejs.no-ip.org/code/greasemonkey
// @description allows you to ignore posts from specific users
// @include     http://boards.ign.com/*
// ==/UserScript==

// ADD YOUR IGNORES HERE:
list = new Array("AirNik", "hotgi");

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var allRows, thisRow, thisAuthor;
allRows = xpath("/html/body/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table[2]/tbody/tr[@class='BoardRowA']");

for(var i = 0; i < allRows.snapshotLength; i++) {
    thisRow = allRows.snapshotItem(i);
    thisAuthor = thisRow.firstChild.firstChild.firstChild.nodeValue;
    for(j = 0; j < list.length; j++) {
        if(thisAuthor == list[j]) {    
            thisRow.nextSibling.nextSibling.innerHTML = "";
            thisRow.nextSibling.innerHTML = "";
            thisRow.innerHTML = "";
        }
    }
}
