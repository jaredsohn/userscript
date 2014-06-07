// ==UserScript==
// @name           DTA! - Photobucket
// @description    2007/03/19 - Adds hidden links to enable use of DownloadThemAll! on Photobucket.com
// @include        http://*photobucket.com/albums/*/*
// ==/UserScript==

// This script only works on the visible page.

selectedLinks = document.evaluate("//a[contains(@href, 'action=view&current=')]",
        document.getElementById('pageContainer'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {

    var imageLink = selectedLinks.snapshotItem(snapshotIndex)

    newLink = document.createElement('a')
    newLink.setAttribute('href', imageLink.getAttribute('href').replace('?action=view&current=', '') )
    newLink.setAttribute('style', 'display:none;' )
    newLink.setAttribute('title', 'DTA' )

	imageLink.parentNode.appendChild(newLink)
    imageLink.href += '&'
}