// ==UserScript==
// @name           Electrobuzz Scan download pages
// @include        http://www.electrobuzz.net/
// @description    On electrobuzz.net this script will automatically open the download links in new window
// @version		   0.1
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
// End Release Notes
	var answer = confirm ("Do you want to scan for links?")
	if (answer)
window.addEventListener("load",function() {

		var ss = document.evaluate("//a[contains(@href, '#more')]", document, null, 6, null);			
		for(var i = 0; i < ss.snapshotLength; i++) {
			var node = ss.snapshotItem(i);
				window.open(node.getAttribute('href'));
		}


	}, false);