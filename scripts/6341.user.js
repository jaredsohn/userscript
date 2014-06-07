// ==UserScript==
// @name           DTA! - SprintPCS Pictures
// @description    Adds hidden links to enable use of DownloadThemAll! on http://Pictures.SprintPCS.com
// @include        http*://pictures.sprintpcs.com/*
// ==/UserScript==

/*
/2.jpg?partExt=.jpg&limitsize=100&&outquality=90&squareoutput=255,255,255&ext=.jpg&border=1&clampsize=100&squareoutput=241,241,241
/2.jpg?partExt=.jpg&limitsize=280&&outquality=90&ext=.jpg&border=2,255,255,255,1,0,0,0,0
/2.jpg?partExt=.jpg&limitsize=3300&&outquality=90&ext=.jpg
*/

selectedLinks = document.evaluate("//a/img[contains(@src, '.jpg?partExt=.jpg&limitsize=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {

	var imageLink = selectedLinks.snapshotItem(snapshotIndex);

	newLink = document.createElement('a');

	newLink.setAttribute('href', imageLink.getAttribute('src').replace(/^(.+\.jpg)\?.*$/, '$1?partExt=.jpg&limitsize=3300&&outquality=90&ext=.jpg') )

	imageLink.parentNode.parentNode.appendChild(newLink)
}


/*
_100.jpg?border=1&squareoutput=241,241,241&ext=.jpg&outquality=90
_3300.jpg?ext=.jpg&border=2,255,255,255,1,0,0,0,0&outquality=90
_3300_1.jpg?ext=.jpg&border=2,255,255,255,1,0,0,0,0&outquality=90
*/
selectedLinks = document.evaluate("//a/img[contains(@src, '00.jpg?')]|//a/img[contains(@src, '00_1.jpg?')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {

	var imageLink = selectedLinks.snapshotItem(snapshotIndex);

	newLink = document.createElement('a');

	newLink.setAttribute('href', imageLink.getAttribute('src').replace(/^(.+[0-9]+)_[0-9]+00(_[0-9])?.jpg\?.+$/, '$1_3300$2.jpg?ext=.jpg&outquality=90') )

	imageLink.parentNode.parentNode.appendChild(newLink)
}