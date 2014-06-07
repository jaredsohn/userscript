// ==UserScript==
// @name        HD Club
// @namespace   hdclub.org
// @include     hdclub.org, tracker.hdclub.com.ua
// @version     1.1
// ==/UserScript==

try {
	
	var links_in_row = document.evaluate("//tbody[@id='highlighted']/tr/td[3]//a[contains(@href,'details.php')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	while( (link = links_in_row.snapshotItem(i) ) != null) {

		// create our link
		var downloadLink = document.createElement('a');
		var breakElm = document.createElement('br');
		downloadLink.href = 'http://hdclub.org/download.php?id=' + link.href.match(/\d{5,7}/);
		downloadLink.setAttribute('style','font-weight:bold;color:#336699;');
		
		// add text to our link
		var downloadDivContent = document.createTextNode(' Download');
		downloadLink.appendChild(downloadDivContent);

		// add link to our div
		link.parentNode.appendChild(downloadLink);
	
		i++;
	}
	
} catch(e) {};

