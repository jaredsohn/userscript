// ==UserScript==
// @name           DTA! - Suicidegirls Members
// @description    Adds hidden links to enable use of DownloadThemAll! on Suicidegirls.com for Hopefuls. (Requires Membership)
// @include        http://suicidegirls.com/members/*/albums/member/*/
// @include        http://www.suicidegirls.com/members/*/albums/member/*/
// ==/UserScript==

selectedLinks = document.evaluate("//a/img[contains(@src, '_thumb.jpg')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {

	var imageLink = selectedLinks.snapshotItem(snapshotIndex);

	newLink = document.createElement('a');

	newLink.setAttribute('href', imageLink.getAttribute('src').replace(/_thumb.jpg$/, '.jpg') )

	imageLink.parentNode.parentNode.appendChild(newLink)

}
