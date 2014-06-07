// Last Updated: 04-09-2011
// By SiNiquity (-Bane)

// Version 3.2
// Generalized width computation to work on most vBulletin forums.
// Only catch is that the forum must take up the entire page, but
// beyond that it _should_ work (no guarantees).

// Version 3.1.1
// Removed logging information, which prevents the script from polluting the
// error console.

// Version 3.1
// 1) If a link is already loading the image when the user clicks on it, then
// it opens a new window/tab to that image. This is primarily for large images
// which take some time to load.

// Version 3.0
// NOW WORKS IN CHROME*
// *Standard image loading / resizing. Hotlink bypass is not supported in
// Chrome as XSS-XHR is not supported.

// MAJOR CODE CLEAN-UP
// 1) Rewrote link / image traversal code to use XPath to get the 
// desired objects immediately.
// 2) Rewrote the image retrieval function to use an asynchronous request.
// An added benefit of this is the ability to get around hotlink protections
// as well as loading images which are not stored in a URL ending in a
// image extension (i.e. gif,jpeg,tiff, etc).
// 3) Links function normally if image fails to load via the script (i.e. opens
// in a new window/tab). There is a slight delay, (1-2 seconds) but worth it.
// 4) Rewrote the resize function to correctly utitlize the post-table.
// Pictures will no longer break the post table except under extenuating
// circumstances (e.g. pyramid quoting a large image).
// Note: this means users with a liquid skin can get larger images by default.
// 5) Added logic to the zoom functions to keep the picture in view based
// on where the user clicked.
// 6) Links which are images will zoom in / out properly. Can still navigate
// to the link via right-click. If link does not need zooming, then clicking
// on the image works as a link as normal.

// KNOWN ISSUES:
// 1) The image position is not taken into account. So, for example, if an
// image is quoted, the quote box takes up some amount of room; however the
// calculation ignores this and instead sizes itself as if the quote box
// were not there. This is probably for the best, as otherwise one would
// need to take into account alignment (left/right/center), or possible
// combinations thereof, etc.. There may be a way around it but it's not
// worth saving a few pixels.
// 2) If you're running Firefox 4, make sure you update your GreaseMonkey
// add-on extension to 0.9.2 or later.


// 2.0 Features:
// - Rewrote the image loading code using http requests. This yields a few nice features:
// 1) Bypasses websites with hotlink protection
// 2) Images are not cached (for those at work). Only means of detection would be a traffic log (or looking at your computer screen lol).
// The following is also a possibility, but have not yet determined how to work it into the script:
// 3) Links which do not appear to be images can still be loaded as images (such as a PHP generated image).
//
// 1.1c Features:
// - If an image fails to load, the link still remains and an error message is indicated.
//
// 1.1b Features:
// - Config option to turn off smart image resizing (in case of conflicts with other image sizing scripts).
// - All config options are now preceded with TW (to hopefully disambiguate from any other scripts).
//
// 1.1a Bug fixes:
// - Changed the fake events from clicks to "complete" events
// (images with click event handlers already, such as smilies in the reply window,
// were getting "clicked" on page load).
//
// 1.1 Features:
// - Auto resizes all images to fit within the tables.
// - If an image gets resized, you can click on it to view it in its full glory (zoom in)
// - Click again to zoom out.
//
// 1.0 Features:
// - Click on image to view it (or use prefs to do it for you)
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tribalwar Image Embedder", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          vBulletin Image Embedder
// @namespace     SiNiquity
// @description   Embeds image links directly into vBulletin forum posts. Auto-resizes images that are too large to fit within the post table. Click to zoom. Bypasses hotlink protections and loads links without image extensions.
// @version       3.2
// @include       http://www.tribalwar.com/forums/showthread.php*
// ==/UserScript==

if(!String.prototype.trim) {
    String.prototype.trim = function() {
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
    }
}

var resizePref = localStorage.getItem("resizeOff");
if(resizePref == null) {
    resizePref = "on";
}

var computedMaxWidth = 0;
if(resizePref == "on") {
    checkImageSizes(false);
    window.addEventListener("resize", function(e) { checkImageSizes(true); }, false);
} else {
    computeMaxWidth();
}

//========== BEGIN MAIN PROGRAM ==========//
var links = document.evaluate("//div[starts-with(@id, 'post_message')]//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < links.snapshotLength; i++) {
    setupLinkToImage(links.snapshotItem(i),i);
}
//=========== END MAIN PROGRAM ===========//

function setupLinkToImage(link, id) {
    var child = link.firstChild;
    if(child.nodeType == 3 && child.nodeValue.trim().length == 0) {
	child = getNextNode(child);
    }
    
    if(child.nodeType == 3) {
	// Only add event listener on links which have
	// TEXT as their primary result.
	link.addEventListener("click", handleLinkToImageClick, true);
	link.setAttribute("id",id);
    }
}

function handleLinkToImageClick(e) {
    if(!e) e = window.event;
    var link = window.event ? e.srcElement : e.target;
	
    while(link && link.nodeName.toLowerCase() != "a") {
	// Clicking on image-link gives image, not link.
	link = link.parentNode;
    }

    // Should load all images the same...
    if(retrieveImage(link)) {
	e.stopPropagation();
	e.preventDefault();
    }
}

function retrieveImage(link) {
    if(link.getAttribute("data-loading")) {
	return false;
    }

    link.setAttribute("data-loading", true);
    var url = link.getAttribute("href");
    var img = null;

    if(!urlHasValidScheme(url)) {
	return false;
    }
   
    // Currently only works in FireFox -- Chrome will
    // throw an exception here.
    var imageRequest = GM_xmlhttpRequest({
	method: "GET",
	url: url,
	headers: {
	    "Referer" : url,
	    "Accept" : "image/*",
	},
	// Force binary data
	overrideMimeType: "text/plain;charset=x-user-defined", 
	onreadystatechange: function(response) {
	    var imageType;
	    if(response.responseHeaders) {
		var imageType = getResponseHeader(response, "Content-Type");
		imageType = imageType.toLowerCase();
		if(imageType.indexOf("image") != 0) {
		    if(typeof imageRequest != "undefined") {
			imageRequest.abort();
		    }
		    return handleNonImageRetrieval(url);
		}
	    }
	    if(response.readyState == 4 && response.responseText) {
		var imgSrc = "data:" + imageType + ";base64,"
		    + toBase64(response.responseText);
		replaceLinkWithImage(link, imgSrc);
	    }
	},
	onerror: function(response) {
	    // Old school style, try replacing the link
	    // with the URL.
	    replaceLinkWithImage(link,url);
	}
    });

    return true;
}

function handleNonImageRetrieval(url) {
    window.open(url);
}

function replaceLinkWithImage(link, src) {
    var img = new Image();
    img.src = src;
    img.addEventListener("error", imageLoadError, false);

    // Only text links are allowed up to this point
    img.alt = link.firstChild.nodeValue;
    img.style.borderStyle = "none";

    // Replace the link if the image is already loaded,
    // otherwise wait for successful load before replacing.
    img.setAttribute("data-linkId", link.getAttribute("id"));
    img.addEventListener("load", handleImageLoad, false);

    if(resizePref == "on") {
	attachResizeListener(img);
    }
    return true;
}

function handleImageLoad(event) {
    if(!event) event = window.event;
    var img = event.currentTarget;
    var link = document.getElementById(img.getAttribute("data-linkId"));
    insertImage(link, img);
    img.removeAttribute("data-linkId");
}

function imageLoadError(event) {
    if(!event) event = window.event;
    var img = event.currentTarget;
    handleNonImageRetrieval(img.src);
}

function attachResizeListener(img) {
    // Make the image position relative so that the
    // event.layerX and event.layerY positions return
    // the position relative to the image and not
    // the entire document
    img.style.position = "relative";
    img.addEventListener("load", resizeImageCallback, false);
    img.addEventListener("click", resizeImageCallback, false);
}

function recordDefaultSize(img) {
    if(!img.getAttribute("data-default-width") 
       || !img.getAttribute("data-default-height")) {
	img.setAttribute("data-default-width", img.width);
	img.setAttribute("data-default-height", img.height);
	return true;
    }
    return false;
}

function resizeImage(img, mouseX, mouseY) {
    var width = img.width;
    var height = img.height;
    var maxWidth = getMaxWidth(img);

    if(recordDefaultSize(img)) {
	// Make it fit
	zoomOut(img,mouseX,mouseY);
    } else {
	if(img.style.cursor == getZoomInCursor()) {
	    // Click to zoom in
	    zoomIn(img,mouseX,mouseY);
	} else if(img.style.cursor == getZoomOutCursor()) {
	    zoomOut(img,mouseX,mouseY);
	}
    }
}

function resizeImageCallback(event) {
    if(!event) event = window.event;
    var img = window.event ? event.srcElement : event.target;

    if(event.type == "load") {
	img = event.currentTarget;
	img.removeEventListener("load", resizeImageCallback, false);
	resizeImage(img);
    } else {
	var mouseX = event.layerX;
	var mouseY = event.layerY;
	resizeImage(img, mouseX, mouseY);
    }


    if(img.style.cursor != "") {
	// In case image was a link
	event.stopPropagation();
	event.preventDefault();
    }
}

function checkImageSizes(calledByResize) {
    computeMaxWidth();

    var xpathImgs = document.evaluate("//td[starts-with(@id, 'td_post')]//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < xpathImgs.snapshotLength; i++) {
	var img = xpathImgs.snapshotItem(i);
	// Every image in the post table gets a handler
	if(!calledByResize) {
	    attachResizeListener(img);
	    if(img.complete) {
		var event = document.createEvent("UIEvents");
		event.initUIEvent("load", false, false, window, 0);
		img.dispatchEvent(event);
	    }
	} else if(img.style.cursor != getZoomOutCursor()) {
	    // The image is already zoomed in -- call zoomOut to test that it still fits within the post table
	    zoomOut(img);
	} else {
	    // Zoomed-in; just double check to be sure we still need the cursor.
	    var defaultWidth = parseInt(img.getAttribute("data-default-width"));
	    var maxWidth = getMaxWidth(img);
	    if(defaultWidth <= maxWidth) {
		img.style.cursor = "";
	    }
	}
    }
}

function toBase64(rawData) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var output = "";
	
    do {
	chr1 = rawData.charCodeAt(i++) & 0xff;
	chr2 = rawData.charCodeAt(i++) & 0xff;
	chr3 = rawData.charCodeAt(i++) & 0xff;
		
	enc1 = chr1 >> 2;
	enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	enc4 = chr3 & 63;
		
	if(isNaN(chr2)) { 
	    enc3 = enc4 = 64;
	} else if(isNaN(chr3)) {
	    enc4 = 64;
	}
		
	output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    } while(i < rawData.length);
	
    return output;
}

function zoomOut(img,mouseX,mouseY) {
    var defaultWidth = parseInt(img.getAttribute("data-default-width"));
    var defaultHeight = parseInt(img.getAttribute("data-default-height"));
    var currentWidth = img.getAttribute("width");
    var currentHeight = img.getAttribute("height");

    var maxWidth = getMaxWidth(img);

    if(defaultWidth > maxWidth) {
	var multiplier = maxWidth/defaultWidth;
	var newWidth = Math.floor(defaultWidth*multiplier);
	var newHeight = Math.floor(defaultHeight*multiplier);

	var oldPosition = getPosition(img);
	img.setAttribute("width", newWidth);
	img.setAttribute("height", newHeight);
	var newPosition = getPosition(img);

	var delta = getScrollDelta(mouseX,mouseY,currentWidth,currentHeight,newWidth,newHeight);
	if(typeof mouseX != "undefined" && typeof mouseY != "undefined") {
	    delta.x += newPosition.x - oldPosition.x;
	    delta.y += newPosition.y - oldPosition.y;
	}
	window.scrollBy(delta.x,delta.y);
	img.style.cursor = getZoomInCursor();
	return true;
    } else {
	img.setAttribute("width", defaultWidth);
	img.setAttribute("height", defaultHeight);
	img.style.cursor = "";
	return false;
    }
}

function getScrollDelta(mouseX,mouseY,oldWidth,oldHeight,newWidth,newHeight) {
    if(typeof mouseX == "undefined" || typeof mouseY == "undefined" ||
       typeof oldWidth == "undefined" || typeof oldHeight == "undefined" ||
       typeof newWidth == "undefined" || typeof newHeight == "undefined") {
	return {x:0,y:0};
    }

    var newMouseX = (mouseX)*newWidth/oldWidth;
    var newMouseY = (mouseY)*newHeight/oldHeight;
    var xDelta = newMouseX - mouseX;
    var yDelta = newMouseY - mouseY;
    return {x: xDelta, y:yDelta};
}

function getPosition(obj) {
    var x = 0;
    var y = 0;
    if(obj.offsetParent) {
	while(obj) {
	    x += obj.offsetLeft;
	    y += obj.offsetTop;
	    obj = obj.offsetParent;
	}
    }
    return {x:x,y:y};
}

function zoomIn(img,mouseX,mouseY) {
    var defaultWidth = parseInt(img.getAttribute("data-default-width"));
    var defaultHeight = parseInt(img.getAttribute("data-default-height"));
    var currentWidth = img.getAttribute("width");
    var currentHeight = img.getAttribute("height");

    var oldPosition = getPosition(img);
    img.setAttribute("width", defaultWidth);
    img.setAttribute("height", defaultHeight);
    var newPosition = getPosition(img);

    var delta = getScrollDelta(mouseX,mouseY,currentWidth,currentHeight,defaultWidth,defaultHeight);
    delta.x += (newPosition.x - oldPosition.x);
    delta.y += (newPosition.y - oldPosition.y);
    window.scrollBy(delta.x,delta.y);

    var maxWidth = getMaxWidth(img);
    if(defaultWidth > maxWidth) {
	img.style.cursor = getZoomOutCursor();
	return true;
    } else {
	img.style.cursor = "";
	return false;
    }
}

function getMaxWidth(img) {
    return computedMaxWidth;
}

function computeWidth(elem, fillerCoeff) {
    if(!elem || elem == document.body || elem.nodeType != 1) {
	return document.body.clientWidth;
    }
    // Webkit changes width computations into margin computations...
    var useWidth = navigator.userAgent.indexOf("WebKit") < 0;
    var width = elem.style.width;
    if(!width) {
	// ... but only if they're styles. If it's HTML attribute
	// then the margins are 0. This is an annoying distinction
	// that FireFox does not share.
	width = elem.getAttribute("width");
	useWidth = true;
    }
    if(width && useWidth) {
	if(width.indexOf("%") >= 0) {
	    var scale = parseInt(width)/100.0;
	    width = scale * computeWidth(elem.parentNode, -1);
	} else {
	    width = parseInt(width);
	}
    } else {
	width = computeWidth(elem.parentNode, -1);
    }

    var filler = 0;
    var postStyle = document.defaultView.getComputedStyle(elem, null);
    
    filler += parseInt(postStyle.getPropertyValue("border-left-width"));
    filler += parseInt(postStyle.getPropertyValue("border-right-width"));
    filler += parseInt(postStyle.getPropertyValue("padding-left"));
    filler += parseInt(postStyle.getPropertyValue("padding-right"));
    filler += parseInt(postStyle.getPropertyValue("margin-left"));
    filler += parseInt(postStyle.getPropertyValue("margin-right"));

    var result = width + fillerCoeff*filler;
    //GM_log(elem.nodeName + ": " + width + "+" + fillerCoeff + "*" + filler + "=" + result);
    return result;
}

function computeMaxWidth() {
    // Assume max width is the document body by default.
    var maxWidth = parseInt(document.body.clientWidth);

    
    var post = document.evaluate("//table[starts-with(@id, 'post')]//td[starts-with(@id, 'td_post_')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var postTable = document.evaluate("//div[@id = 'posts']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Find a post and post table
    if(post && postTable) {
	// Then calculate parent widths and add them up.
	var maxWidth = computeWidth(post, -1);
	//GM_log("Max width: " + maxWidth);
	// Calculate previous sibling widths and add them up
	var postSibling = getPrevNode(post);
	while(postSibling) {
	    var width = computeWidth(postSibling, 1);
	    //GM_log("Sibling " + width);
	    maxWidth -= width;
	    postSibling = getPrevNode(postSibling);
	}
    }
    computedMaxWidth = maxWidth;
}

/**
 * Returns the next node (skipping text nodes containing the empty string)
 */
function getNextNode(node) {
    var nextNode = node.nextSibling;
    while(nextNode && nextNode.nodeType == 3 && nextNode.nodeValue.trim().length == 0) {
	nextNode = nextNode.nextSibling;
    }
    return nextNode;
}

/**
 * Returns the previous node (skipping text nodes containing the empty string)
 */
function getPrevNode(node) {
    var prevNode = node.previousSibling;
    while(prevNode && prevNode.nodeType == 3 && prevNode.nodeValue.trim().length == 0) {
	prevNode = prevNode.previousSibling;
    }
    return prevNode;
}

function insertImage(link, img) {
    // Find true previous and next nodes
    var prevNode = getPrevNode(link);
    var nextNode = getNextNode(link);
    
    // Place span around the image
    var span = document.createElement("span");
    span.setAttribute("name","twEmbedder");

    // Insert breaks before if needed
    if(prevNode && prevNode.nodeType == 3) {
	span.appendChild(document.createElement("br"));
    }
	
    // Insert image
    span.appendChild(img);
	
    // Insert breaks afterward if needed
    if(nextNode && nextNode.nodeType == 3) {
	span.appendChild(document.createElement("br"));
    }
	
    // Insert span element and remove link
    link.parentNode.insertBefore(span,link);
    link.parentNode.removeChild(link);
}

// Could be better, but this should get most of them.
function urlHasValidScheme(url) {
    return url.indexOf("://") > 0;
}

function getZoomInCursor() {
    if(navigator.userAgent.indexOf("WebKit") >= 0) {
	return "-webkit-zoom-in";
    } else if(navigator.userAgent.indexOf("Gecko") >= 0) {
	return "-moz-zoom-in";
    }
    return "";
}

function getZoomOutCursor() {
    if(navigator.userAgent.indexOf("WebKit") >= 0) {
	return "-webkit-zoom-out";
    } else if(navigator.userAgent.indexOf("Gecko") >= 0) {
	return "-moz-zoom-out";
    }
    return "";
}

function getResponseHeader(response, headerName) {
    if(!response.responseHeaders) return false;
    headerName += ": ";
    responseHeaders = response.responseHeaders.split("\n");
    for(var i = 0; i < responseHeaders.length; i++) {
	var index = responseHeaders[i].indexOf(headerName);
	if(index != -1) {
	    return responseHeaders[i].substring(index + headerName.length);
	}
    }
    return false;
}

if(GM_registerMenuCommand) {
    GM_registerMenuCommand("TW Embedder: Image Resizing (on)", function(event) {
	localStorage.removeItem("resizeOff");
    });

    GM_registerMenuCommand("TW Embedder: Image Resizing (off)", function(event) {
	localStorage.setItem("resizeOff",true);
    });
}

