// ==UserScript==
// @name           Delphiforums: Remove Total Message Count from MyForums
// @namespace      http://www.nyboria.de
// @description    Removes number of total messages in a forum displayed on the MyForums page
// @include        http://profiles.delphiforums.com/n/pfx/profile.aspx?nav=myforums*
// ==/UserScript==

// Find the table cells which contain the numbers by their class
var getTD = document.evaluate("//td[@class='ptcValue ptcMessages']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


if (getTD.snapshotItem(0)) {

var myLength = getTD.snapshotLength;

for (var i = 0; i < myLength; i++) {

	var myTD = getTD.snapshotItem(i);
	var myNumber = myTD.childNodes[0];
	myTD.removeChild(myNumber);
		
	}

}