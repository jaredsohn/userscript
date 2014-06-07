// javafaq
// version 0.1 
// 2005-06-04
// Copyright (c) 2005, drac (lair.fierydragon.org)
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
// select "Hello World", and click Uninstall.
//

// ==UserScript==
// @name          javafaqcleaner
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Cleans up the Javafaq user interface.
// @include       http://www.ibiblio.org/javafaq/*
// ==/UserScript==

function remove_div(id) {
	var divID = document.getElementById(id);
	if (divID) {
		divID.parentNode.removeChild(divID);
	}
}

var contentDiv = document.getElementById('Content');
if (contentDiv) {
	contentDiv.style.marginRight = '0px';
	contentDiv.style.paddingRight = '0px';
}

remove_div('Header');
remove_div('Menu');
remove_div('footer');