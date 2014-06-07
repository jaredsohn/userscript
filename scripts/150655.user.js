// ==UserScript==
// @name           NtvmsnbcPhoto
// @description    Makes Ntvmsnbc Photos and their links copyable.
// @namespace      http://userscripts.org/users/ocanal
// @version        0.2
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://fotogaleri.ntvmsnbc.com/*
// ==/UserScript==

function xpath(xpath, element) {
    if (!element)
        element = document;
    return document.evaluate(xpath, element, null,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function fixGallery() {
    var blankImages = xpath("//div[@class='BlankPixel']/a/img");
    
    if (blankImages.snapshotLength > 0) {
        var preloadImage = document.getElementById("imgPicture");
        if (preloadImage) {
            blankImages.snapshotItem(0).src = preloadImage.src;
        }
    }
}

fixGallery();