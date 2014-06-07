// ==UserScript==
// @name           DTA! - Suicidegirls.com
// @description    Adds hidden links to enable use of DownloadThemAll! on Suicidegirls.com. (Requires Membership)
// @include        http://suicidegirls.com/girls/*/photos/*/
// @include        http://www.suicidegirls.com/girls/*/photos/*/
// ==/UserScript==

selectedLinks = document.evaluate("//a/img[contains(@src, 't.jpg')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {

	var imageLink = selectedLinks.snapshotItem(snapshotIndex);

	newLink = document.createElement('a');

	newLink.setAttribute('href', imageLink.getAttribute('src').replace(/t.jpg$/, '.jpg') )

	imageLink.parentNode.parentNode.appendChild(newLink)

}
