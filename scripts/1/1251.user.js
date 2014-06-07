// ==UserScript==
// @name 			flickerAccessKeys
// @namespace       http://origamisoup.com/greasemonkey/
// @description 	Enables navigation through flicker.com photo pages using "," and ".". Works on single photo pages and pages with a numbered paginator
// @include 		http://www.flickr.*
// ==/UserScript==
//
// By Tillman Dickson, Jr. (tillman_jr AT yahoo DOT com)
//
// Version: 0.30 2005.07.11
//
// Notes:
// 		1) Idea based on the excellent AccessKeys extension. A bit of how-to, specifically keydown parsing, was taken with modification from AccessKeys
// 		2) Commenting is overly pedantic. This is done for the convenience of newbie coders :)
//		3) Like commenting the code could be streamlined in a few places 
//
// Outstanding issues:
//		1) turnPage should explicitly detect numbered pages instead of assuming the case if not photo page
//				FYI: a simple -if ( document.getElementById("paginator") )- always returns false. Will resolve later



(function() {

function linkPage(linkValue) {
	window.location = linkValue;
}
function turnPhotoPage(goToNextPage){
	var myApiKey = 'ba9c13fdc1cf751d8409e0ba0d959ab9';
	pid = location.pathname.split('/')[3];
	request = 'http://www.flickr.com/services/rest/?method=flickr.photos.getContext&photo_id=' + pid + '&api_key=' + myApiKey;
	/* method specification: http://www.flickr.com/services/api/flickr.photos.getContext.html */
				
	GM_xmlhttpRequest({
		method: 'GET',
		url: request,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "text/xml");
			var navObject;
			var photoTag = '';
			if (goToNextPage){
				photoTag = 'nextphoto';
			} else {
				photoTag = 'prevphoto'; }
			
			var navObjects = dom.getElementsByTagName( photoTag );
			var navObject = navObjects[0];
			navIdAttr = navObject.getAttribute('id');
			navId = navIdAttr.value;
			if (navId != "0"){
				navUrl = navObject.getAttribute('url');
				linkPage(navUrl);
			}			
		}		
	});
	return false;	
}
function turnNumberedPage(goToNextPage){
	// our DIV is unique in its use of the class "paginator", find it though this returns a list (getSingleNode????)
	var linkDivList = document.evaluate("//div[@class='paginator']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);  
	if (linkDivList) {		
		var linkDiv = linkDivList.iterateNext();				// our DIV is the first one in the list
		if ( linkDiv.hasChildNodes ) {
			var childList = linkDiv.childNodes;					// the child node alternate between text elements and ANCHORS with one or two SPANs intermingled
			if (childList) {
				var prevNode = null;							// element containing the "previous page" link
				var nextNode = null;							// element containing the "next page" link	
				var currAnchor = null;							// a reference to the most recently found ANCHOR until we find the "this-page" span
				var currPageFound = false;						// have we come to the SPAN indicating the currently page
				
				var cnt = childList.length;
				for ( i=0; i < cnt; i++ ) {						
					curEl = childList[i];						
					if ( curEl.className == "this-page" ) {		// is this the "this-page" SPAN which indicates the current page?
						currPageFound = true;					// mark "this-page" as found 
						prevNode = currAnchor;					// the last ANCHOR we detected, stored in currAnchor, should be the "previous page" ANCHOR
					} 
					else if (curEl.nodeName == "A") {			// is it an ANCHOR element?
						if (currPageFound)	{					// if the current page has already been found then this is the "next page" ANCHOR
							nextNode = curEl;
							break;
						} else {								// else we are detecting ANCHORS before the "this-page" SPAN
							currAnchor = curEl; }				// set it as the most recently found, i.e. current, anchor				
					}
				}  // end of for loop
				
				var goToUrl = "";				
				if (goToNextPage){											// are we navigating to the "next page?"
					if ( nextNode != null ) { goToUrl = nextNode.href; }	// then get url for "next page"
				} else 											
					if ( prevNode != null ) { goToUrl = prevNode.href; }	// else get url for "previous page"
				
				if (goToUrl != "") { 							// if we have a valid URL go to it
					linkPage( goToUrl ); 
					return false; 								// supress the error beep
				}				
			}			
		} 
	}	
	return true;												// we failed to do not supress the error beep
}
function turnPage(goToNextPage){
	// is photo page? (main photo plus small thumbnail for previous and next pictures)
	if (document.getElementById("button_bar")) {  				// this detection method lifted from "Flickr Photo Page Enhancer"
		return turnPhotoPage( goToNextPage );
	} else { 
		// then this is a page with numbered links for the preceding and succeeding (Next/Previous) page(s)
		return turnNumberedPage( goToNextPage ); 
	}
}
function detectKey(e) {
	var keyCode, keyChar
	if (!e) var e = window.event;
	if (e.keyCode) { keyCode = e.keyCode; }
	else if (e.which) { keyCode = e.which; }
	keyChar = String.fromCharCode(keyCode);
	if ((keyChar == ",") || (keyCode == 37)) { return turnPage(false); } 
	if ((keyChar == ".") || (keyCode == 39)) { return turnPage(true); }
}

document.onkeypress = detectKey;

})();