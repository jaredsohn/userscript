//
// ==UserScript==
// @name Travians
// @namespace http://userscripts.org/scripts/show/51701
// @description This script will take you to your house from any location on the map.
// @include *travians.com*
// @version 0.0.5
// ==/UserScript==

document.addEventListener('click', function(event) {

	var allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	// go through links

	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var thisLink = allLinks.snapshotItem(i);
		//match the beam function
		if ((thisLink.innerHTML.match(/Beam Home/i))&&(event.target==thisLink)) {
			event.preventDefault();
			thisLink.removeAttribute("onclick");
			thisLink.addEventListener("click", function(event) {
				try {
					unsafeWindow.closeFunction(); 
					unsafeWindow.xajax_scriptCall('quest', 1, 'beam', 0); 
					return false;
				}catch (e) {}
			}
			, false); 
		}

	}

}, true);

