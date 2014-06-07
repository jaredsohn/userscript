// ==UserScript==
// @name           Pardus Alliance Funds linker
// @author         Gauren (Artemis) / Hitchhiker (Orion)
// @description    Adds a link to the alliance funds log to the Funds tab for treasurers
// @include        *.pardus.at/alliance_funds.php
// ==/UserScript==

var t = document.getElementsByTagName("B");

for (i=0; i < t.length;i++) 
{
	if (t[i].textContent.indexOf("Current") > -1) {
		var linkElement = document.createElement("div");
		linkElement.innerHTML = "<p style='font-weight:bold'><a href='http://artemis.pardus.at/alliance_funds_log.php' target='blank_'>View Alliance Funds Log</a></p>";
		t[i].parentNode.insertBefore(linkElement, t[i]);
	}
}
