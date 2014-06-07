// JSC Time Change (GMT) user script
// version 0.1
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
// select "JSC Time Change (GMT)", and click Uninstall.
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
// @name           JSC Time Change (GMT)
// @date           17/08/2013
// @namespace      http://www.vini.co.uk
// @description    Changes event start time on Al Jazeera Sports TV to GMT
// @include        http*://*.aljazeerasport.*
// @include 	   http*://*.aljazeerasport.*/Live/event/Schedule/channel/
// @version        0.1
// @creator        Vini
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

	var foo2 = str.match(/(\d\d:\d\d)/);  // Will match "11:30"
	if (foo2 != null) {
		var t = new Date('Jan 01 1970 ' + foo2[1]);  // Add a fake date to fool the Date data type.  
		var hh = t.getHours() - 2 					// Take 2 to convert  to GMT, change as necessary.
		var ampm = 'AM';							// Assume AM first
		if (hh >= 12) ampm = 'PM';					// If wrong, make it PM!
		if (hh == 0) hh = 12;      					 // Convert 0 o'clock to midnight.
		var tstr =  nf(hh) + ':' + nf(t.getMinutes());  
		elem.nodeValue = str.replace(foo2[0], tstr); // Will update original time in Title Bar to correct time
	}
}