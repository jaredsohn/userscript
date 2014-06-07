// ==UserScript==
// @name            Google Image Ripper
// @namespace       http://dearcomputer.nl/gir/
// @description     No more thumbnails, straight to the good stuff! Rewrites Google Image Search results to show full images instead of the thumbnails.
// @include http://images.google.*/* 
// @include http://www.google.*/images?* 
// @include http://www.google.*/imghp* 
// @include http://www.google.*tbm=isch* 
// @include http://*.google.*/imgres?imgurl=*
// @include http://*.google.*/search?q=*

// @include https://images.google.*/* 
// @include https://www.google.*/images?* 
// @include https://www.google.*/imghp* 
// @include https://www.google.*tbm=isch* 
// @include https://*.google.*/imgres?imgurl=*
// @include https://*.google.*/search?q=*

// @version         1.8
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

// 1.5 - Combined the GIR and GIB
// 1.6 - Fixed some page permissions
// 1.7 - Google changed the element ID for the image table. Took me a while to figure it out. Should
//       work without issue now.
// 1.8 - Added an extra include statement.

(function () {

if ((/q=/).test(document.location.href)) {
	if (!(/&sout=1/).test(document.location.href)) {
		window.location = window.location + "&sout=1";
	}
}
})();

(function() {

    // Get list of all anchor tags that have an href attribute containing the start and stop key strings.
    var fullImgUrls = selectNodes(document, document.body, "//a[contains(@href,'/imgres?imgurl\x3d')][contains(@href,'\x26imgrefurl=')]");

    //clear existing markup
    var imgContent = document.getElementById('center_col');
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