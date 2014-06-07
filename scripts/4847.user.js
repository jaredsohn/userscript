// Last.fm Save Date of Birth
// version 1.2
// 2006-07-21
// Copyright (c) 2006, staticsage
// Released under the GPL license
// http://www.gnu.org/licenses/gpl.txt
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Last.fm Save Date of Birth", and click Uninstall.
//
// --------------------------------------------------------------------
//
// version 1.2 - 4/18/07
// Updated the divID to work properly with the
// March 2007 Last.fm update. (Thanks snyde1!)
//
// version 1.1
// Changed element method to avoid conflicts with other scripts.
//
// version 1.0
// Fixes Last.fm's Date of Birth bug.
//
//
// ==UserScript==
// @name          Last.fm Save Date of Birth
// @description   Fixes Date of Birth bug for users born before December 31, 1969
// @include       http://www.last.fm/settings/*
// ==/UserScript==

GM_registerMenuCommand("Set Birthday", function() {setBirthday()});

function setBirthday() {
	var dob = prompt("Enter your date of birth.. \nDD\/MM\/YYYY");

	dob = dob.split("/");
	for (i=0;i<=1;i++) {
		dob[i] = dob[i].replace("0", "");
	}
	
	GM_setValue("DOB_d", dob[0]);
	GM_setValue("DOB_M", dob[1]);
	GM_setValue("DOB_Y", dob[2]);

	window.location.reload();
}

if (GM_getValue("DOB_d") == undefined) {
	setBirthday();
}

document.getElementById("general").elements[12].value = GM_getValue("DOB_d");
document.getElementById("general").elements[13].value = GM_getValue("DOB_M");
document.getElementById("general").elements[14].value = GM_getValue("DOB_Y");