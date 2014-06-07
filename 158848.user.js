/*
    Google Image Ripper 2
*/

// ==UserScript==
// @name          Google Image Ripper 2
// @namespace     freecyber
// @description   Rewrites Google Image Search results to show full images in addition to the thumbnails.
// @include       http*://images.google.tld/*
// @include       http*://www.google.tld/images?*
// @include       http*://www.google.tld/search?*site=img*
// @include       http*://www.google.tld/search?*tbm=isch*
// @include        http*://*.google.*/imgres?*
// @include        http*://*.google.*/imghp*
// @grant         none
// ==/UserScript==

(function () {

// from Google Image Basic
	if ((/q=/).test(document.location.href)) {
		if (!(/&sout=1/).test(document.location.href)) {
			window.location.replace(window.location+"&sout=1");
		}
	}



    
// from Google Image Ripper by dearcomputer
    // expand page title
    document.title += " [ripped results by Google Image Ripper 2]";  
	
    // Get list of all anchor tags that have an href attribute containing the start and stop key strings.
	var fullImgUrls = selectNodes(document, document.body, "//a[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]");

	//clear existing markup
//	var imgContent = document.getElementById('ImgContent');
	var imgContent = document.getElementById('center_col'); // to get below sidebar (leftnav)
/*	imgContent.innerHTML = ""; // don't clear
*/  

    for(var x=1; x<=fullImgUrls.length; x++) {
        //reverse X to show images in correct order using .insertBefore imgContent.nextSibling
        var reversedX = (fullImgUrls.length) - x;
        // get url using regexp
        // [change to links] var fullUrl = fullImgUrls[reversedX].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );
        var fullUrl = fullImgUrls[reversedX].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=(.*?)\&/ );
        // if url was fetched, create img with fullUrl src
        /* [change to links] 
        if(fullUrl) {
            newElement = document.createElement('img');
            imgContent.parentNode.insertBefore(newElement, imgContent.nextSibling);
            newElement.src = decodeURI(fullUrl[1]);
        } */
        if(fullUrl) {

			newLink = document.createElement('a');
			imgContent.parentNode.insertBefore(newLink , imgContent.nextSibling);
			newLink.href = unescape(fullUrl[2]);

			newLink.style.borderColor = 'White';

			newElement = document.createElement('img');
			newLink.appendChild(newElement);
			newElement.src = decodeURI(fullUrl[1]);
			newElement.border = 0;

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