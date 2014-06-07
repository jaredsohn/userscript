// ==UserScript==
// @name           GayRomeo_Images
// @namespace      http://www.patrik-spiess.de/gayRomeoMod
// @description    In search results, this scripts shows the full image next to the thumbnail. Click the big image to close it or select another thumnail to show that one's full image. 
// @include	http*://*.gayromeo.*/*/search/*
// @include	http*://*.planetromeo.*/*/search/*
// ==/UserScript==

function showFullImageDiv(event){
	hideFullImageDiv(null);

	// generate the url of the real image
	var thumbnailImage = document.evaluate(
		"img/@src",
		this,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var thumbnailImageURL = thumbnailImage.snapshotItem(0).textContent;
	var imgUrl = thumnainURL2imageURL(thumbnailImageURL);
	var myImg = document.createElement("img");
	myImg.setAttribute("id", "imgPreview");
	myImg.setAttribute("src", imgUrl);
	myImg.setAttribute("title", "click to close");
	myImg.setAttribute("style", "position:absolute;");
	myImg.addEventListener("click", hideFullImageDiv, false);
	this.parentNode.appendChild(myImg);
} 

function hideFullImageDiv(event){
	// remove old image
	var node = document.getElementById("imgPreview");
	if (node)
		node.parentNode.removeChild(node);
}

var thumbnailLinks;

//alert("GayRomeo_Images\n" + document.location.href);
//alert(getHostAndSessionID());

// Get an array of all a elements around the thumbnail img elements
thumbnailLinks = document.evaluate(
	"//td/a[img/@class='thumb']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (thumbnailLinks.snapshotLength > 0) {
	// for each matched a element
	for (var i=0; i<thumbnailLinks.snapshotLength; i++) {
		var currentATag = thumbnailLinks.snapshotItem(i);
		currentATag.addEventListener("mouseover", showFullImageDiv, true);
		//currentATag.addEventListener("mouseout", hideFullImageDiv, true);
	}
}

//input href= http://www.gayromeo.com/auswertung/pix/thumb.php/522503.s20997757.8cfe7fb55811.jpg
//output href= http://www.gayromeo.com/<session-id>/auswertung/pix/pic.php/522503.s20997757.8cfe7fb55811.jpg
function thumnainURL2imageURL(thumbnailPicURL) {
	var regex = /php\/(.*$)/;
	var matches = regex.exec(thumbnailPicURL);
	return getHostAndSessionID()+"auswertung/pix/pic.php/" + matches[1];
}

// uses frame url: http://www.gayromeo.com/<session-id>/search/index.php?action=execute&searchType=userOnlineIn&direct_city=1
function getHostAndSessionID() {
	return document.location.href.match(/^[^\/]*\/\/[^\/]*\/[^\/]*\//);
}

