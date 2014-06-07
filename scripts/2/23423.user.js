
// Copyright (c) 2008, Kai Mai(www.kai-mai.com)
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
// VGApp/hnw/CorporatePortal
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ziprealty - Add MLS number to links to homes in 'My Home' page
// @namespace     http://kai-mai.com/
// @description   Add MLS number to links to homes in 'My Home' page in ziprealty.com  so you send the list to your agent, and s/he doesn't need to look up MLS numbers from the addresses again.  You need to login ziprealty.com to view 'My Home' page
// @include       *.ziprealty.com/buy_a_home/logged_in/my_homes/*
// ==/UserScript==


// not the most efficient ways to look for the links. but it works!
// this looks for every link in the home list table
var homeLinks = document.evaluate('/html/body/center/form/table/tbody/tr/td[2]/table[2]/tbody//a',
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// the tag for MLS number
var look_for = 'listing_num=';

// look for anything start with a bunch of numbers  followed by a space
re = /\d+ /;
for (var i = homeLinks.snapshotLength - 1; i >= 0; i--) {
	var elm = homeLinks.snapshotItem(i);
	var index = elm.href.indexOf(look_for);
	if( index >= 0){
		
		// look for home address link 
		if(!re.test(elm.textContent))
			continue;
		if(elm.textContent.contain('mls#') >=0 )
			continue;
		var s = elm.href.substr(index+look_for.length);
		var list_num = s.substr(0, s.indexOf('&'));	
		
		
		elm.textContent = elm.textContent + ' mls# '+ list_num;
	}

}

