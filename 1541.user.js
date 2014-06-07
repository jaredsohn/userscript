// freshclean
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
// @name          freshclean
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Cleans up the freshnews.org interface. Removes the customization div and other surrounding UI elements; leaves just the newsboxes.
// @include       http://freshnews.org/*
// ==/UserScript==

function remove_meta_links() {
	var allLinks, thisLink;
		allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var j = 0;
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.href.match(/detach|remove/i)) {
			thisLink.parentNode.removeChild(thisLink);
		 }	
	}
}

function remove_div(id) {
	var divID = document.getElementById(id);
	if (divID) {
		divID.parentNode.removeChild(divID);
	}
}

function add_toggle() {
	var allHeads, thisHead;
		allHeads = document.evaluate(
		'//div[@id=\'table_head\']',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allHeads.snapshotLength; i++) {
		thisHead = allHeads.snapshotItem(i);
		var chk = document.createElement('input');
		chk.type = 'checkbox';
		chk.id = i;
		chk.defaultChecked = false;
		chk.onclick = function() { if (chk.checked) { alert(this.parentNode.nextSibling.value); } else { alert(this.parentNode.nextSibling.id); } }
		thisHead.appendChild(chk);
	}
}

// add_toggle();
remove_meta_links();
remove_div('header');
remove_div('google_ad');
remove_div('footer');
