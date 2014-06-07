// ==UserScript==
// @name           FlickrPhoto
// @description    Makes Flickr Photos and their links copyable.
// @namespace      http://userscripts.org/users/ocanal
// @version        0.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

function xpath(xpath, element) {
    if (!element)
        element = document;
    return document.evaluate(xpath, element, null,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function fixGallery() {
    var blankImages = xpath("//div[@class='spaceball']");
    
    if (blankImages.snapshotLength > 0) {
        var blankImage = blankImages.snapshotItem(0);
        blankImage.parentNode.removeChild(blankImage);
    }
}

fixGallery();