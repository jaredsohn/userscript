// eBay Snipe at esnipe.com
// version 1
// 2006-10-16
// Copyright 2006 Fred Jaggi
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This script adds a "Snipe this item" link to item pages you view after
// doing a search on eBay. You can click on the link to be taken directly
// to the esnipe entry form for that item.
//
// Heavily based on the script 'eBay Snipe at AuctionSniper.com'
// by Scott Winder.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Snipe at esnipe.com

// @description   Adds an esnipe link to the currently viewed item
// @include       http://cgi.ebay.com/*
// @include       http://cgi.ebay.co.uk/*
// @include       http://cgi.ebay.de/*
// ==/UserScript==

var idLoc = location.pathname.indexOf("QQitemZ");
var itemId, endLoc;

if (idLoc != -1) {
	idLoc += 7;
	endLoc = location.pathname.indexOf( "QQ", idLoc );
	itemId = location.pathname.substring( idLoc, endLoc );
} else {
	idLoc = location.search.indexOf("&item=");
	if ( idLoc != -1 ) {
		idLoc += 6;
		var endLoc = location.search.indexOf( "&", idLoc );
		if ( endLoc <= idLoc ) {
			endLoc = location.search.length;
		}
		itemId = location.search.substring( idLoc, endLoc );
	}
}

if (idLoc != -1) {

	var snipeUrl = "http://www.esnipe.com/snipeit/placebid_v2.asp?URL=" + location.href
	
	var watchLink = 0;
	for ( var i = 0; i < document.links.length; i++ ) {
		if ( document.links.item(i).href.indexOf( "MakeTrack" ) != -1 ) {
			watchLink = document.links.item(i);
			break;
		}
	}
	
	if (watchLink) {
		var snipeLink = document.createElement("a");
		snipeLink.href = snipeUrl;
		snipeLink.title = "Snipe this auction on esnipe.com";
		var img = document.createElement("img");
		img.src = "data:image/gif;base64,R0lGODlhEAAQAMZ2ADIyrf7+/wgInOXl9ZeX1dTU7nNzx3Fxxh8fpUNDtH9/zOfn9aen3C4uqwEBmQICmvr6/ZCQ02dnwvv7/fj4/KSk2ywsqx0dpQMDmkREtFJSuhsbpDo6sPf3/CIip+Tk9Csrqp+f2aOj2u7u+Kam27Cw3yAgpru75Ccnqf39/tbW7y0tqzMzrZiY1jw8sQ0Nnpub14+P0p6e2Hp6yqio3BwcpA8Pn8/P7BMTodXV7uzs94mJ0EdHteLi81lZvVdXvNfX7/z8/oaGz9DQ7BUVoUxMt9vb8RISoFNTupKS029vxWpqw7Oz4a+v3xERoLGx4AcHnG1txaGh2TExrRgYoyYmqKys3jk5sGRkwbS04Z2d2AkJnb+/5T4+sqWl2w4On4GBzU9PuTc3r8vL6lhYvAQEmwoKnc7O6wYGmyMjpzY2rxoao0VFtR4epSUlqAUFm7a24tzc8ZmZ1kZGtTU1rgAAmf///////////////////////////////////////ywAAAAAEAAQAAAHfoB2goIMCQICCQyDi3YEdY+QjwSMEpGWdRKDjnURlmgtDnWTdpB2FZBvJXY2j3YMkCA5dT9kdWMXkIWWZ4JDloaWgxChkIeWEIIdloiRRVMqQCwZkYmQJRBHjzUpWg+PipAUa5EeExqtjY/elkSho3aVl5CZi5uX74yFh4mMgQA7";
		img.border = "0";
		img.align = "top";
		snipeLink.appendChild(img);
		watchLink.parentNode.insertBefore(snipeLink, watchLink);
		watchLink.parentNode.insertBefore(document.createTextNode(" "), watchLink);
		snipeLink = document.createElement("a");
		snipeLink.href = snipeUrl;
		snipeLink.title = "Snipe this auction on esnipe.com";
		snipeLink.target = "_BLANK";
		snipeLink.appendChild(document.createTextNode("Snipe this Item"));
		watchLink.parentNode.insertBefore(snipeLink, watchLink);
		watchLink.parentNode.insertBefore(document.createTextNode("  |  "), watchLink);
	}
}

// CHANGELOG:
//
// v1 (2006-10-16)
// - initial release





