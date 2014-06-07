// ==UserScript==
// @name           angesagter.de userinfopage-script
// @description    this script converts the primary user-picture to the same type of show.php-link as the secondary pictures are
//
//		   Author: Marco Borm, Germany
//
//		   Terms and conditions:
//		   This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Germany License.
//		   To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.0/de/ or send a letter 
//		   to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.


// @include        http://*angesagter.de/info.php*

// ==/UserScript==

var imageNodes = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

theMatch = document.URL.match(/.+\/info.php\?user=(.+)/i); 
if ( theMatch ) {
	userName = theMatch[1];

	for (var i = 0; i < imageNodes.snapshotLength; i++) {
		var imageNode = imageNodes.snapshotItem(i);

		var imageSource = imageNode.getAttribute("src");
		if ( imageSource ) {
			var match = imageSource.match(/\/[\da-f]{2}\/([\da-f]{32})\.jpg/i)
			if ( match && (imageNode.parentNode.nodeName != "a") ) {
				pictureId = match[1];

				var primaryPictureNode = imageNode.cloneNode(true);

				InfoLinkNode = document.createElement('a');
				// http://www.angesagter.de/show.php?u=Baxteri&p=ace4abdb507fe3617ed452c520acb479
				InfoLinkNode.setAttribute('href', '/show.php?u=' + userName + '&p=' + pictureId);
				InfoLinkNode.appendChild(primaryPictureNode);

				imageNodes.snapshotItem(i).parentNode.replaceChild(InfoLinkNode, imageNode);
			}
		}
	}
}



