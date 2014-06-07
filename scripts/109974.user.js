// eBay PDT to CST end auction time change user script
// version 0.1 Beta
// 2011-08-11
// Copyright (c) 2011, Brett Walach (FightCube Technologies, Inc.) <fightcube@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "eBay PDT to CST time change", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Credits:
//   Base code - Steinar H. Gunderson - http://bzr.sesse.net/greasemonkey-scripts/
//   24 to 12 hour code - Anatoly Milner (The Milner Group, Inc.) <greasemonkeyscript@milnergroup.net>
//   convertMonth Function - Mark Bryan Yu - http://userscripts.org/users/24500
//   http://www.w3schools.com/jsref/jsref_obj_date.asp
//   http://www.javascriptkit.com/javatutors/redev2.shtml
//   http://www.regular-expressions.info/javascriptexample.html
//
// ==UserScript==
// @name           eBay PDT to CST time change
// @date           08/11/2011
// @namespace      http://www.FightCube.com
// @description    Changes eBay auction end time from PDT to CST timezone (easy to edit for your time zone, see comments)
// @include        http*://*.ebay.*
// @exclude        http*://*.fightcube.*
// @version        0.10 Beta
// @include        http*://*.ebay.*
// @creator        Brett Walach (FightCube Technologies, Inc.) <fightcube@gmail.com>
// ==/UserScript==

function convertMonth(x)
{
	if (x == 1) return "Jan";
	if (x == 2) return "Feb";
	if (x == 3) return "Mar";
	if (x == 4) return "Apr";
	if (x == 5) return "May";
	if (x == 6) return "Jun";
	if (x == 7) return "Jul";
	if (x == 8) return "Aug";
	if (x == 9) return "Sep";
	if (x == 10) return "Oct";
	if (x == 11) return "Nov";
	if (x == 12) return "Dec";
}

function nf(x)
{
	if (x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}

function getTextNodes(oNode, aText)
{
	for (var i = 0; i < oNode.childNodes.length; i++) {
		var oChild = oNode.childNodes.item(i);
		switch(oChild.nodeType) {
		case 1:
			getTextNodes(oChild, aText);
			break;
		case 3:
			aText.push(oChild);
			break;
		}
	}
}

var text = [];
getTextNodes(document, text);

for (var i = 0; i < text.length; i++) {
	var elem = text[i];
	var str = elem.nodeValue;

// Uncomment the following for date recognition
// However this is not necessary as it reformats it exactly as it was
// NOTE: This will not match the Title bar date, but would be simple to do so
/*
	var foo1 = str.match(/(\S\S\S)\s(\d\d)\,\s(\d\d\d\d)/); // Will match "Aug 12, 2011"
	if (foo1 != null) {
		var d = new Date(foo1[1] + ' ' + foo1[2] + ' ' + foo1[3]);
		var dstr =  convertMonth(d.getMonth() + 1) + ' ' + nf(d.getDate()) + ', ' + d.getFullYear();
		elem.nodeValue = str.replace(foo1[0], dstr);
  }
*/

	var foo2 = str.match(/(\d\d:\d\d:\d\d)\s+(PDT|PST)/);  // Will match "11:25:54 PDT" or "14:55:23 PST"
	if (foo2 != null) {
		var t = new Date('Jan 01 1970 ' + foo2[1]);  // Add a fake date to fool the Date data type.  
		var hh = t.getHours() + 2 	// Add 2 to convert from Pacific to Central Standard Time, change as necessary.
		var ampm = 'AM';						// Assume AM first
		if (hh >= 12) ampm = 'PM';	// If wrong, make it PM!
		if (hh > 12) hh -= 12;      // Convert 24-hour format to 12-hour.
		if (hh == 0) hh = 12;       // Convert 0 o'clock to midnight.
		// Add your appropriate PST,CST,EST in the line below
		var tstr =  nf(hh) + ':' + nf(t.getMinutes()) + ':' + nf(t.getSeconds()) + ' ' + ampm + ' CST';  
		elem.nodeValue = str.replace(foo2[0], tstr); // Will update original time in Title Bar and Auction page to correct time
	}
}