// ==UserScript==
// @name		MusicBrainz: Set text direction to RTL for Arabic and Hebrew
// @description	A simple script to change the text direction to right to left for Arabic or Hebrew.
// @version		2010-06-24
// @author		-
// @namespace	df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://*musicbrainz.org/*

// ==/UserScript==
//**************************************************************************//

// Set this to "true" to set the table direction to rtl when the script is set to Arabic or Hebrew
var rtltable = false;

// Set this to "true" to have RTL text right-aligned in table cells.
// Leaving it as "false" will still fix the direction of the text.
var rightalign = false;

/**************************************************************************/

var url = document.location.href;

// RTL table on release pages
if (rtltable == true && url.match(/^http:\/\/.*musicbrainz.org\/release\/[0-9a-f-]{36}$/)) {
	var rtl = false;

	// Find out if the script is set to Arabic or Hebrew
	var all = document.getElementsByTagName("dt");
	for (var i = 0; i < all.length; i++) {
		if (all[i].innerHTML == "Script:") {
			var nextSibling = all[i].nextSibling;
			while (nextSibling && nextSibling.nodeType != 1) {
				nextSibling = nextSibling.nextSibling;
			}
			var cname = nextSibling.innerHTML;
			if (cname == "Hebrew" || cname == "Arabic") {
				rtl = true;
			}
		}
	}
	
	// If it is, set the direction of the table
	if (rtl == true) {
		var table = document.getElementsByTagName("table")[0];
		table.dir = "rtl";
	}
}

// Track titles on the recording page
/*
if (url.match(/^http:\/\/.*musicbrainz.org\/recording\/[0-9a-f-]{36}$/)) {
	var table = document.getElementsByTagName("table")[0];
	
	var tr = table.getElementsByTagName("tr");
	for (var i = 0; i < tr.length; i++) {
		var td = tr[i].getElementsByTagName("td");
		if (td.length == 9) {
			td[1].dir = "rtl";
		}
	}
}
*/

// Set the direction on any <a> tags which have RTL characters
var nodes = document.getElementById("page").getElementsByTagName("a");
for (var i = 0; i < nodes.length; i++) {
	var text = nodes[i].innerHTML;

	if (/^http:\/\//.test(text)) {
		continue;
	}

	if (/[\u060D-\u0615\u0621-\u063A\u0641-\u064A\u0656-\u0658\u066A-\u066F\u0671-\u06DC\u06DE-\u06FF\uFB50-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\u0591-\u05A1\u05A3-\u05B9\u05BB-\u05C4\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFB4F]/.test(text)) {
		nodes[i].dir = "rtl";
	} else if (rtl == true) { // When rtl is true, we set the table to rtl, so we need to set ltr for the things which aren't rtl
		nodes[i].dir = "ltr";
	}
}

// Set the direction on any <td> tags which have RTL characters
var nodes = document.getElementById("page").getElementsByTagName("td");
for (var i = 0; i < nodes.length; i++) {
	var text = nodes[i].innerHTML;

	if (/^http:\/\//.test(text)) {
		continue;
	}

	if (/[\u060D-\u0615\u0621-\u063A\u0641-\u064A\u0656-\u0658\u066A-\u066F\u0671-\u06DC\u06DE-\u06FF\uFB50-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\u0591-\u05A1\u05A3-\u05B9\u05BB-\u05C4\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFB4F]/.test(text)) {
		if (rightalign == true) {
			nodes[i].dir = "rtl";
		} else {
			nodes[i].innerHTML = "<span dir=\"rtl\">" + text + "</span>";
		}
	} else if (rtl == true) { // When rtl is true, we set the table to rtl, so we need to set ltr for the things which aren't rtl
		nodes[i].dir = "ltr";
	}
}
