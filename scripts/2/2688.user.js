// ==UserScript==
// @name           angesagter.de profviewspage-script
// @description    adds a picture to every userlink on the profviews.php-page
//
//		   Author: Marco Borm, Germany
//
//		   Terms and conditions:
//		   This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Germany License.
//		   To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.0/de/ or send a letter 
//		   to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.


// @include        http://*angesagter.de/profviews.php

// ==/UserScript==

var linkNodes = document.evaluate('//a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < linkNodes.snapshotLength; i++) {
	var linkNode = linkNodes.snapshotItem(i);

	var userInfoLink = linkNode.getAttribute("href");
	if ( userInfoLink ) {
		var match = userInfoLink.match(/\/info\.php\?user=(.+)/i)
		if ( match ) {
			userName = match[1];

			pictureNode = document.createElement('img');
			pictureNode.setAttribute('src', "http://www.angesagter.de/bp.php/" + userName);
			pictureNode.setAttribute('height', "100");

			linkNodes.snapshotItem(i).appendChild(pictureNode);

		}
	}
}



