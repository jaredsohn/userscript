// ==UserScript==
 // @name           iGoogle Cleaner
 // @namespace      Sewar
 // @description     Cleans iGoogle page by hiding header and removing footer.
 // @include        http*://www.google.tld/ig*
 // @exclude        http*://www.google.tld/ig/*
 // @version         1.1
// ==/UserScript==

/**
Based on "iGoogle Header Remover" script by Michael Sacchi.
http://userscripts.org/scripts/show/24339
*/

/* I didn't figure out what is this class used for, so i just commented this code. Maybe enable or remove it later
var snapResults = document.evaluate("//*[@class='gbh']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults.snapshotItem(i);
	elm.style.display = 'none';
}
*/

function toggle_bar() {
	bar = document.getElementById("nhdrwrapsizer");
	if (bar.style.display == 'none') {
		bar.style.display = '';
		bar.nextSibling.nextSibling.style.display = '';
	} else {
		bar.style.display = 'none';
		bar.nextSibling.nextSibling.style.display = 'none';
	}
}

var toggle_bar_link;

toggle_bar_link = document.createElement("a");
toggle_bar_link.className = 'gb1';
toggle_bar_link.href = 'javascript:void(null);';
toggle_bar_link.addEventListener("click", toggle_bar, false); // .onClick never-ever worked for me here :-(
toggle_bar_link.innerHTML = 'Toggle header';
document.getElementById("gbar").firstChild.appendChild(toggle_bar_link, document.getElementById("gbar"));


// Hide bar by default; TODO: Save toggle state and apply it on start
toggle_bar();

// Hide the big footer too, how need it?
document.getElementById("footerwrap").style.display = 'none';
