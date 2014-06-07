// ==UserScript==

// @name           Shartak Trader Inventory Parser
// @namespace      http://www.philosoph.us/
// @description    Parses a trader's inventory into a string that can be added to the "Trading hut stock reports" page on the Shartak wiki.
// @include        http://*shartak.com/game.cgi*

// ==/UserScript==

// Shartak Trader Inventory Parser
// Version: 1.2 (2006-06-12)


if (match=document.evaluate("//select[@name='tobj']//option", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)) {
	var matchLen=match.snapshotLength;
	if (matchLen>0) {
		var item=new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "0B", "0C", "0D", "0E", "0F", "0G", "0H", "0I", "0M", "0N", "0O", "0P", "0Q", "0R", "0S", "0T", "0U", "0V"), out=''; // Create an array of all 27 common item IDs
		for (i=0, m=0; i<27; i++) { // For each item
			if (m<matchLen && item[i]==match.snapshotItem(m).value) { // If the trader has this item
				out+="||x "; // Add "x" to the output string
				m++; // Increment "m"
			} else {
				out+="||bgcolor=MistyRose|0 "; // Add "0" to the output string
			}
		}
		document.body.innerHTML=document.body.innerHTML.replace(/(<h3[^<]+Inventory)/, "<p class=\"trader-inventory-parsed\" style=\"background-color: #aaa; font-size: .8em; padding: .5em\">|-<br />|~~~~ " + out + "</p>\n$1"); // Add a results paragraph above the "Inventory" header
	}
}