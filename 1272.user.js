// ModCounter
// version 0.1 BETA!
// 2005-07-09
// Copyright (c) 2005, Rich Morris
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// To uninstall, go to Tools/Manage User Scripts,
// select "ModCounter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ModCounter
// @namespace     http://www.singsurf.org/greasemonkey
// @description   Counts how many mod points you have used
// @include       http://slashdot.org/*
// @include       http://*.slashdot.org/*
// ==/UserScript==

// loop through select statments and count how many do not have
// a reason Normal (index 0)
// alerts the current number of points used

function modChange() {
    var pointsUsed = 0;
    var allReasons2;
    allReasons2 = document.evaluate(
    '//select[starts-with(@name,"reason")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    for (var i = 0; i < allReasons2.snapshotLength; i++) {
    	thisReason = allReasons2.snapshotItem(i);
	if(thisReason.selectedIndex != 0) ++pointsUsed;
    }
    alert('Mod points used '+pointsUsed);
}

// loop through all the select elements with a name starting reason
// and set the onchange event handeller

var allReasons, thisReason;

allReasons = document.evaluate(
    '//select[starts-with(@name,"reason")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allReasons.snapshotLength; i++) {
    thisReason = allReasons.snapshotItem(i);

    thisReason.onchange = modChange;
}

