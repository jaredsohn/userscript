// ==UserScript==
// @name            Google Image Ripper
// @namespace       http://dearcomputer.nl/gir/
// @description     No more thumbnails, straight to the good stuff! Rewrites Google Image Search results to show full images instead of the thumbnails.
// @include         *.google.*images*
// @include         *images.google.*
// @version         1.4.1
// ==/UserScript==

// ==CHANGELOG==
// ver 1.0 - 2008.10.13
// - initial release
//
// ver 1.1 - 2009.07.16
// - fixed after changed google image search markup
//
// ver 1.2 - 2009.12.04
// - fixed after another google markup change
// - added version number to modified title
// - improved javascript for logo DOM modification
//
// ver 1.3 - 2010.01.19
// - linked images to original hosting pages (thnx to shake & freecyber for suggestions)
//
// ver 1.4 - 2010.05.10
// - fixed after a google url change
//
// ver 1.4.1 - 2010.05.13
// - improved include settings
(function() {

    // expand page title
    document.title += " [ripped results by Google Image Ripper v1.4]";

    //change logo
    googleLogo = document.getElementById('logo').getElementsByTagName('img');
    googleLogo[0].src = "data:image/png;base64,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";

    // Get list of all anchor tags that have an href attribute containing the start and stop key strings.
    var fullImgUrls = selectNodes(document, document.body, "//a[contains(@href,'/imgres?imgurl\x3d')][contains(@href,'\x26imgrefurl=')]");

    //clear existing markup
    var imgContent = document.getElementById('ImgContent');
    imgContent.innerHTML = "";

    for(var x=1; x<=fullImgUrls.length; x++) {
        //reverse X to show images in correct order using .insertBefore imgContent.nextSibling
        var reversedX = (fullImgUrls.length) - x;
        // get url using regexp
        var fullUrl = fullImgUrls[reversedX].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=(.*?)\&usg/ );
        // if url was fetched, create img with fullUrl src
        if(fullUrl) {
            newLink = document.createElement('a');
            imgContent.parentNode.insertBefore(newLink , imgContent.nextSibling);
            newLink.href = unescape(fullUrl[2]);
            newElement = document.createElement('img');
            newLink.appendChild(newElement);
            newElement.src = decodeURI(fullUrl[1]);
            newElement.border = 0;
            newElement.title = fullUrl[2];
        }
    }

    function selectNodes(document, context, xpath) {
        var nodes = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = [];
        for (var x=0; x<nodes.snapshotLength; x++) {
            result.push(nodes.snapshotItem(x));
        }
        return result;
    }

})();