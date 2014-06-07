// TWoP Speedkeyer
// version 0.2 Gamma
// 2007-05-01
// Copyright (c) 2007, Jason Lefkowitz
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TWoP Speedkeyer
// @namespace     http://www.jasonlefkowitz.net/userscripts/
// @description   Add shortcut keys to 'next' and 'previous' page links in Television Without Pity forums.
// @include       http://forums.televisionwithoutpity.com/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Add notice that page has been modified
function writeOutNoticeBox(accessKeyList) {

	var navbar = document.getElementById('navstrip');
	if (navbar) {

		noticeOfChange = document.createElement('p');
		noticeOfChange.innerHTML = 'Speed keys added to thread by TWoP Speedkeyer' + accessKeyList;
		noticeOfChange.setAttribute('style','text-align: center; font-weight: bold; background: #F4E7EA; border: 1px solid #DC7F5A; padding: 5px;');
		navbar.parentNode.insertBefore(noticeOfChange, navbar);
	
	}

}

function keyPress(incomingEvent) {

	if (incomingEvent.ctrlKey == true && incomingEvent.keyCode == 37 && prevlinks.snapshotLength != 0) {

		window.location = firstPrevLink;

	} else if (incomingEvent.ctrlKey == true && incomingEvent.keyCode == 39 && nextlinks.snapshotLength != 0) {

		window.location = firstNextLink;

	}

}


// Add accesskeys to next and previous links
var prevlinks = xpath('//a[@href][@title="Previous Page"]');
var nextlinks = xpath('//a[@href][@title="Next page"]');

if (nextlinks.snapshotLength != 0 || prevlinks.snapshotLength != 0) {

	var accessKeyList = new String('<br>');
	var nextPageUrl = new String();
	var prevPageUrl = new String();

 	if (prevlinks.snapshotLength != 0) {

 		firstPrevLink = prevlinks.snapshotItem(0);
 		accessKeyList += 'Ctrl + &larr; for previous page in thread';

	}

	if (nextlinks.snapshotLength != 0) {
		
		firstNextLink = nextlinks.snapshotItem(0);
		if (prevlinks.snapshotLength != 0) {
			accessKeyList += ', ';
		}
		accessKeyList += 'Ctrl + &rarr; for next page in thread';
	}

	window.addEventListener('keypress', keyPress, false);

	writeOutNoticeBox(accessKeyList);

}
