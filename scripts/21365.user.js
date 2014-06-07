// RedFin Walkability
// version 0.1 
// 2008-01-25
// Copyright (c) 2008, Michael Roufa
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
// select "RedFin Walkability", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedFin Walkability
// @namespace     http://www.roufa.com/greasemonkey/
// @description   Show a property's WalkScore on RedFin.
// @include       http://www.redfin.com/stingray/do/printable-listing*
// ==/UserScript==

function getElementText(elID) {
	return document.getElementById(elID).innerHTML.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^ +/g, "").replace(/ +$/g, "");
}

function showWalkability() {
	var add1 = getElementText('address_line_1');
	var add2 = getElementText('address_line_2');
	var addr = (add1 + ' ' + add2).replace(/ /, "+");
	var loc = "http://www.walkscore.com/get-score.php?street=" + addr + "&go=Go";
	var div = document.createElement('div');
	var anc = document.createElement('a');
	anc.target = '_new';
	anc.href = loc;
	anc.innerHTML = "Show Walkability";
	div.appendChild(anc);
	var sibling = document.getElementById('address_line_2');
	sibling.parentNode.insertBefore(div, sibling.nextSibling);
}

showWalkability();