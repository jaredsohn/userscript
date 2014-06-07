// ==UserScript==
// @name           Large On Black
// @namespace      http://www.flickr.com/photos/godzillante/
// @description    Adds a line below the photo with a link to bighugelabs' Large On Black page for that photo.
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

var photo_divs, photo_div, notes_span;

var photo_divs = document.evaluate(
    "//div[@class='photoImgDiv']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
);

photo_div = photo_divs.snapshotItem(0);
notes_span = document.getElementById("noteCount");

if (photo_div){
    var ob_par = document.createElement('div');
    var ob_link = document.createElement('a');
    
    ob_link.innerHTML = "Large On Black";
    
    var photoid = extractPhotoId();
    var bigHL_URL = "http://bighugelabs.com/flickr/onblack.php?id=" + photoid + "&size=large";
    ob_link.href = bigHL_URL;
    
    ob_par.style.textAlign="right";
    ob_par.style.fontStyle="italic";
    ob_par.appendChild(ob_link);
    
    //let's add the link below the "This photos has notes..." line, if exists
    if (notes_span)
        notes_span.parentNode.insertBefore(ob_par, notes_span.nextSibling);
    else
        photo_div.parentNode.insertBefore(ob_par, photo_div.nextSibling);
    
    //addEvent(ob_link, "click", "addlargeonblack");
}

function extractPhotoId () {
	var photoIdElementParent = document.getElementById("photoswftd");
	var photoIdCandidates = document.evaluate("//h1", photoIdElementParent, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < photoIdCandidates.snapshotLength; i++) {
		var candidate = photoIdCandidates.snapshotItem(i).id;
		if (candidate.substring(0,9) == "title_div") {
			return candidate.substring(9);
		}
	}
}
