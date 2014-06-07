// ==UserScript==
// @name           DTA! - MySpace Photos
// @description    Adds hidden links to enable use of DownloadThemAll! on MySpace. Warning: This script will grab full versions of ALL visable myspace thumbnails.
// @include        *.myspace.com/*
// @include        */myspace.com/*
// ==/UserScript==

var selectedLinks = document.evaluate("//img[contains(@src,'myspacecdn.com/images')]|//a/img[contains(@src, '_s.') or contains(@src, '_m.') or contains(@src, '_l.')]|//img[contains(@src, 'tinypic.com') and contains(@src, '.jpg')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

/*

Link grabbing explanation.

//img[contains(@src,'myspacecdn.com/images')]

    grabs any image hosted on myspace's new image servers

//a/img[contains(@src, '_s.') or contains(@src, '_m.') or contains(@src, '_l.')]

    grabs any image using the small, medium, or large file naming system. (weither hosted on myspace or another service such as photobucket)

//img[contains(@src, 'tinypic.com') and contains(@src, '.jpg')]

    grabs any JPG image hosted on tinypic, for the secondary images many people seem to use in the photos.

*/

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {
    var imageLink = selectedLinks.snapshotItem(snapshotIndex);

    var oldLink = imageLink.getAttribute('src');
        oldLink = oldLink.replace(/\/(s|m)_([0-9A-z])/, '/l_$2') // new server
        oldLink = oldLink.replace(/([0-9])_(s|m)\./, '$1_l.')    // old server

    var newLink = document.createElement('a');
        newLink.setAttribute('href', oldLink )
        newLink.setAttribute('style', 'display:none;' )

        imageLink.parentNode.parentNode.appendChild(newLink)
}