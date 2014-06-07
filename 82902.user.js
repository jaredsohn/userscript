// ==UserScript==
// @name           Instructables - See all thumbnails without login
// @description    See all thumbnails without login
// @namespace      just4fun.org
// @include        http://www.instructables.com/id/*
// @version        1.3
// ==/UserScript==


function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(var i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
} 

function removeEvents(node) {
	node.innerHTML = node.innerHTML;
}

function searchSpotID(imageContainer) {
	var searchPattern =/spot\d+$/i;
	var divElements = imageContainer.getElementsByTagName("div");
	var spotID;

	for (var i = 0; i < divElements.length; i++) {
		if(searchPattern.test(divElements[i].id)) { 		
			spotID = divElements[i].id.match(searchPattern);
		}
	}
	return spotID;
}

function enableThumbnails(thumbContainer,spotID) {
	var imgElements = thumbContainer.getElementsByTagName('img');
	var imageID;
	
	for (var i = 0; i < imgElements.length; i++) {
		imageID = imgElements[i].src.match(/[^/]*(?=[.]SQUARE[.])/i);
		imgElements[i].setAttribute("onclick","ImageSpots.show('"+spotID+"','"+imageID+"')");
	}	
}

//Search image containers
var imageContainers = getElementsByClass('images-holder');

for (var i = 0; i < imageContainers.length; i++) {
	//Search thumb container from image container	
	var thumbContainer = getElementsByClass('spotThumbs image-show',imageContainers[i]);
	var spotID;

	if(thumbContainer.length != 0) { 	
		removeEvents(thumbContainer[0]);
		spotID = searchSpotID(imageContainers[i]);
		enableThumbnails(thumbContainer[0],spotID);
	}
}
