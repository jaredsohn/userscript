// FatJAX
// version 0.1
// 2006-11-11
// Copyright (c) 2006, Gary Calpo
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
// To uninstall, go to Tools/Manage User Scripts,
// select "FatJAX", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FatJAX
// @namespace     http://www.fliptech.net/fatjax
// @description   makes Rate Message buttons work without popups
// @include       http://www.fatwallet.com/forums/messageview.php*
// @include       http://fatwallet.com/forums/messageview.php*
// @include       http://www.fatwallet.com/t/*
// @include       http://fatwallet.com/t/*

// ==/UserScript==

// note: code modeled after "stopthepresses" script
// also: thanks to "Dive Into Greasemonkey" for the great walkthroughs 

var pageAddr, links, a, href;
pageAddr = window.location.href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    href = a.href;
        
	// replace instances of "ratepop" with new "ratepop2" function
	href = href.replace(/ratepop/, 'ratepop2');

	if (href != a.href) {
		a.href = href;
//		a.onclick = null; // causes errors.
    }
}


// INSERT NEW FUNCTION 
// there must be a more elegant way...

var ratepop2code = 
	"function ratepop2(threadid,messid,rating,ratetype) { " +
		"if( ratetype == 'thread') " +  
		"	qs = 'threadid=' + threadid + '&messid=' + messid + '&rating=' + rating; " + 
		"else " + 
		"	qs = 'messid=' + messid + '&rating=' + rating; "  +		 
		"if( rating == 1 ){ " +
		"	document.images['pos' + messid].src='/forums/i/icons/vote_pos_1.gif'; " + 
		"	document.images['neg' + messid].src='/forums/i/icons/vote_neg_2.gif'; " + 
		"	document.images['nul' + messid].src='/forums/i/icons/vote_nul_2.gif'; " + 
		"} else if( rating == -1 ){ " + 
		"	document.images['pos' + messid].src='/forums/i/icons/vote_pos_2.gif'; " + 
		"	document.images['neg' + messid].src='/forums/i/icons/vote_neg_1.gif'; " + 
		"	document.images['nul' + messid].src='/forums/i/icons/vote_nul_2.gif'; " + 
		"} else if( rating == 0 ){ " + 
		"	document.images['pos' + messid].src='/forums/i/icons/vote_pos_2.gif'; " + 
		"	document.images['neg' + messid].src='/forums/i/icons/vote_neg_2.gif'; " + 
		"	document.images['nul' + messid].src='/forums/i/icons/vote_nul_1.gif'; " + 
		"}; " +
		"var url = '/forums/ratemsgthread.php?' + qs;" + 
		"var http	= getRequestObject(); " + 
		"if(http) { " + 
		"   http.open('get', url); " + 
        "	http.send(null); " + 
		"} " +
	"} " // end of function

	// add new javascript function to the document
	var newscript = document.createElement("div");
	newscript.innerHTML = '<script type="text/javascript">' + ratepop2code + '</script>';
	document.body.insertBefore(newscript, document.body.firstChild);
	

//
// ChangeLog
// 2006-11-11 - 0.1 - First version :)
