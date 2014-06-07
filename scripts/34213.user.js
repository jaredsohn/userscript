// ==UserScript==
//
// @name          majinarena.net images...
// @description	  Converts majinarena.net thumbnails to full image. Download images right off the thumbnail page using the following  firefox extension: (BatchDownload) https://addons.mozilla.org/en-US/firefox/downloads/file/18996/batchdownload-1.1.6-fx+mz.xpi
// @include       http://majinarena.net/*.php*
//
// ==/UserScript==


function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function replact(){
	var imagearray = xpath("//img[contains(@src,'/thumb_')]");
	if(imagearray.snapshotLength > 0){
		for (var i = 0; i < imagearray.snapshotLength; i++ ) {
			imagearray.snapshotItem(i).src = imagearray.snapshotItem(i).src.replace("/thumb_", "/");
		}
	}
}

function replacn(){
	var imagearray = xpath("//img[contains(@src,'/normal_')]");
	if(imagearray.snapshotLength > 0){
		for (var i = 0; i < imagearray.snapshotLength; i++ ) {
			imagearray.snapshotItem(i).src = imagearray.snapshotItem(i).src.replace("/normal_", "/");
		}
	}
}

replacn();
replact();
