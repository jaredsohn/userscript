// ==UserScript==
// @name           Squirrelmail Toggle Buttons
// @namespace      http://twilite.org/~xtina
// @description    Adds Select Unread and Clear Marks to Squirrelmail.
// @include        *src/right_main.php
// @include        *src/search.php
// ==/UserScript==

// Get the Toggling table.  Who designed this?
var togLine = document.getElementsByTagName("table")[3].childNodes[0].childNodes[0].childNodes[0];

// I'll be picky cat.  Only show if there are unread items on the front page.
var theRows = document.getElementsByTagName("table")[6].getElementsByTagName("tr");
var y = 0;
for (var x = 3; x < theRows.length; x += 2) {
	if (theRows[x].childNodes[3].innerHTML.substr(0, 3) == "<b>") { y++; }
}

// This checks all unread items.
if (y > 0) {
	var togUnread = document.createElement("a");
	togUnread.setAttribute("onClick", 'var theRows = document.getElementsByTagName("table")[6].getElementsByTagName("tr"); for (var x = 3; x < theRows.length; x += 2) { if (theRows[x].childNodes[3].innerHTML.substr(0, 3) == "<b>") { theRows[x].childNodes[1].childNodes[0].checked = "CHECKED"; } }');
	togUnread.setAttribute("href", "javascript:void(0)");
	togUnread.appendChild(document.createTextNode("Select Unread"));

	togLine.appendChild(togUnread);

	togLine.appendChild(document.createTextNode(" "));
}

// This unchecks everything.
var togClear = document.createElement("a");
togClear.setAttribute("onClick", 'var theRows = document.getElementsByTagName("table")[6].getElementsByTagName("tr"); for (var x = 3; x < theRows.length; x += 2) { theRows[x].childNodes[1].childNodes[0].checked = ""; }');
togClear.setAttribute("href", "javascript:void(0)");
togClear.appendChild(document.createTextNode("Clear Marks"));

togLine.appendChild(togClear);
