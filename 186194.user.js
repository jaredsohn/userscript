// ==UserScript==
// @id             1234
// @name           Furcadia Forum Avatar Option
// @version        1.0 
// @author         Squizzle
// @description    Blocks avatar images for member's posts.
// @include        http://forums.furcadia.com/*
// @run-at         document-end
// ==/UserScript==

// DEPRECATED
function hideFurcadiaAvatar(){
    // Get the document images
    var images = document.getElementsByTagName('img');
    for (var i=0;i<images.length;i++){
        if (images[i].src.indexOf(".fox") >= 0){
            images[i].src = ""; // Hide the images by setting its src to nothing
            images[i].alt = ""; // Clean up that alt text for the images we removed
        }
    }
    delete images;
}

function divRemove(classN){
    var divs = document.evaluate('//div[@class="' + classN + '"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<divs.snapshotLength; i++)
        divs.snapshotItem(i).parentNode.removeChild(divs.snapshotItem(i));
    delete divs;
}

divRemove("portrait_fox");