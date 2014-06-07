// Nexus War, Event Compressor user script
// version 0.1.1 beta
// 2006-06-01
// Copyright (c) 2006, Pallas of Nexus War
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install This User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Nexus War, Event Compressor", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Nexus War, Event Compressor
// @namespace     tag:nexuswar.com,Pallas
// @description   This script compresses repeated event messages to a single notification, including the number of times it occurred as well as the time ranges it happened.
// @include       http://*nexuswar.com/map*
// ==/UserScript==

var mlist,onemessage,andagain,repeatCounts,previousDate;

var lastFreshElement,lastFreshText, lastFreshMessageElement,
	lastFreshDateElement;

// Get all the list item elements within the <div id="messages"> element.
mlist = document.evaluate(
	"//div[@id='messages'][1]/ul/li",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

// Go through each one.
for (var i=0; i<mlist.snapshotLength; i++) {
	onemessage = mlist.snapshotItem(i);
	// Extract the message text.
	var messageElement = document.evaluate("span[not(@class='date')][1]",
		onemessage,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (messageElement.snapshotLength == 0) continue;
	messageElement = messageElement.snapshotItem(0);
	// Extract the date element.
	var dateElement = document.evaluate("span[@class='date'][1]",
		onemessage,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (dateElement.snapshotLength == 0) previousDate=null;
	dateElement = dateElement.snapshotItem(0);

	// Compare against the last text.
	if (i == 0 || messageElement.textContent != lastFreshText) {
		// Perhaps we haven't seen this message before.
		if (i > 0 && repeatCounts > 1) {
			// We should modify the last batch of messages.
			// Note the number of times this happened.
			lastFreshMessageElement.innerHTML +=
				' (x'+repeatCounts+') ';
			// Now append the last date.
			lastFreshDateElement.innerHTML +=
				'&mdash;'+previousDate.innerHTML;
		}
		// This is fresh text!  Save bunches of stuff...
		lastFreshElement = onemessage;
		lastFreshDateElement = dateElement;
		lastFreshMessageElement = messageElement;
		lastFreshText = messageElement.textContent;
		repeatCounts = 1;
	} else {
		// This is repeated text.
		repeatCounts++;
		// Note the previous date.
		previousDate = dateElement;
		// Get rid of the content of this message.
		onemessage.parentNode.removeChild(onemessage);
	}
}

if (mlist.snapshotLength > 0 && repeatCounts > 1) {
	// Yes, I did copy and paste this.  Yes, I am ashamed of myself.
	lastFreshMessageElement.innerHTML +=
		' (x'+repeatCounts+') ';
	// Now append the last date.
	lastFreshDateElement.innerHTML += '&mdash;'+previousDate.innerHTML;
}