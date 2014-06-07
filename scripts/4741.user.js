// Last.fm Online Status
// version 0.6
// 2006-07-17
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
// select "Last.fm Beta Reply Tracker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// version 0.6  (2006-09-15)
// Updated script to work with the new site.
//
// version 0.5  (2006-07-21)
// Major rewrite of code. Fixed bug that made user's profile turn red.
//
// version 0.4	(2006-07-19)
// Added an option to color user's username at top of page.
// Updated the menu options.
//
// version 0.3	(2006-07-18)
// Corrected bug that made user's profile turn red.
//
// version 0.2	(2006-07-18)
// Added option to have script show only Online or Offline rather
// than the full colored text.
//
// version 0.1	(2006-07-17)
// Script colors "just seen" greens and any other online status in red.
//
//
// ==UserScript==
// @name          Last.fm Online Status
// @description   Adds color to user's online status
// @include       http*://*.last.fm/user*
// ==/UserScript==


GM_registerMenuCommand("Online Status:", function() {});
GM_registerMenuCommand("    Toggle Last Seen Style", function() {lastSeen()});
GM_registerMenuCommand("    Toggle Name Color On/Off", function() {nameColor()});

var OS_seen = GM_getValue("OS_seen", 1);
var OS_name = GM_getValue("OS_name", 1);

function lastSeen() {
	var a = prompt("Enter an number:\n\n1. Color the Last Seen Text \n2. Show only Online/Offline \n3. Off");
	GM_setValue("OS_seen", a);
}

function nameColor() {
	
	if (OS_name == 1) {GM_setValue("OS_name", 0);}
	if (OS_name == 0) {GM_setValue("OS_name", 1);}
}

var insert = document.getElementById('aboutMe').innerHTML;
if (document.getElementById('aboutMe').innerHTML.search("Edit my detail") == -1) {
	if (OS_name == 1) {
		if (insert.search("minutes ago") != -1) {
			document.getElementById('LastHeadline').innerHTML = document.getElementById('LastHeadline').innerHTML.replace("\/\"\>", "\/\"\>\<font color\=green\>");			
			document.getElementById('LastHeadline').innerHTML = document.getElementById('LastHeadline').innerHTML.replace("\<\/a\>", "\<\/font\>\<\/a\>");
		}
		else {
			document.getElementById('LastHeadline').innerHTML = document.getElementById('LastHeadline').innerHTML.replace("\/\"\>", "\/\"\>\<font color\=#BA001E\>");
			document.getElementById('LastHeadline').innerHTML = document.getElementById('LastHeadline').innerHTML.replace("\<\/a\>", "\<\/font\>\<\/a\>");
		}
	}
}

timefind = insert.substring(insert.search("Last seen"), insert.search("Tracks"));

if (OS_seen == 1) {
	if (timefind.search("minutes ago") != -1) {
		replacetext = insert.substring(insert.search("Last seen") + 9, insert.search("minutes ago") + 11);
		insert = insert.replace(replacetext, "\: \<font color\=green\>" + replacetext + "\<\/font\>");
		document.getElementById('aboutMe').innerHTML = insert;
	}

	else {
		pos1 = insert.search("Last seen") + 9;
		if (timefind.search("today") != -1) {pos2 = timefind.search("today") + 5;}
		else if (timefind.search("evening") != -1) {pos2 = timefind.search("evening") + 7;}
		else if (timefind.search("ago") != -1) {pos2 = timefind.search("ago") + 3;}
		pos2 = pos2 + insert.search("Last seen");
		replacetext = insert.substring(pos1, pos2);
		insert = insert.replace(replacetext, "\: \<font color\=#BA0014\>" + replacetext + "\<\/font\>");
		document.getElementById('aboutMe').innerHTML = insert;
	}



}
else if (OS_seen == 2) {
	if (timefind.search("minutes ago") != -1) {
		replacetext = insert.substring(insert.search("Last seen"), insert.search("minutes ago") + 11);
		insert = insert.replace(replacetext, "\<font color\=green\>Online\<\/font\>");
		document.getElementById('aboutMe').innerHTML = insert;
	}
	else {
		pos1 = insert.search("Last seen");
		if (timefind.search("today") != -1) {pos2 = timefind.search("today") + 5;}
		else if (timefind.search("evening") != -1) {pos2 = timefind.search("evening") + 7;}
		else if (timefind.search("ago") != -1) {pos2 = timefind.search("ago") + 3;}
		pos2 = pos2 + insert.search("Last seen");
		replacetext = insert.substring(pos1, pos2);
		insert = insert.replace(replacetext, "\<font color\=#BA0014\>Offline\<\/font\>");
		document.getElementById('aboutMe').innerHTML = insert;
	}
}






