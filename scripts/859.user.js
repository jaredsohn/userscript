// HospitalityClub SendEasilyMessage
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Paolo Massa
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
// select "HospitalityClub SendEasilyMessage", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HospitalityClub SendEasilyMessage
// @namespace     http://moloko.itc.it/paoloblog/
// @description   Add "send a message" links near usernames on HospitalityClub.org
// @include       *serverkompetenz.net*
// @include       *hospitalityclub*
// ==/UserScript==

// we extract your userId. 
// there is a link such as http://h156808.serverkompetenz.net/hc/mymailbox.php?cid=YOUR_USERID in the page
// we find it and extract the string after cid=
var myUserId='-1';
myMailboxLinks = document.evaluate(
    "//a[contains(@href, 'mymailbox.php')]", 
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var myMailboxLink = myMailboxLinks.snapshotItem(0);
var myMailboxIndex = myMailboxLink.href.indexOf( 'cid=' );
var myMailboxLength = myMailboxLink.href.length;
var myUserId = "";
if (myMailboxIndex != -1 ) {
    myUserId = myMailboxLink.href.substring( myMailboxIndex+4, myMailboxLength );
}

//insert a logo on top of page
//var logo = document.createElement("div");
//logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
//    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
//    'font-size: small; background-color: #000000; ' +
//    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
//    'Hospitality Club ' +
//    '</p></div>';
//document.body.insertBefore(logo, document.body.firstChild);

// we search all the links representing the number of comments received by an user 
// such as http://h156808.serverkompetenz.net/hc/comments.php?cid=HER_USERID
// and extract HER_USERID
// and create a link "SendMsg" that points to the page where you can send a message to that user
var allLinks, thisLink;
allLinks = document.evaluate(
    "//a[contains(@href, 'comments.php')]", 
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

    var index = thisLink.href.indexOf( 'cid=' );
    var length = thisLink.href.length;
    var userId = "";

    if ( index != -1 && myUserId != -1) {
        userId = thisLink.href.substring( index+4, length );
	var link = document.createElement("a");
    	link.innerHTML = '<a href="http://h156808.serverkompetenz.net/hc/contactmember.php?from='+
		myUserId+
		'&to='+ 
    		userId +
   		'"> ' +
    		'SendMsg' +
    		'</a>';
    	thisLink.parentNode.insertBefore(link, thisLink.nextSibling);
    } else {
        //we were not able to extract userId --> do nothing
    }
}
