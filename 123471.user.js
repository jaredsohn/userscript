// ==UserScript==
// @name           Flickr bigger image size view
// @namespace      http://www.flickr.com/
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

(function(){

var index1 = document.body.innerHTML.indexOf("},			o: {",0);
	if ( index1 < 0 ) {
		index1 = document.body.innerHTML.indexOf("},			l: {",0);
		if ( index1 < 0 ) {
			index1 = document.body.innerHTML.indexOf("},			z: {",0);
			if ( index1 < 0 ) {
				index1 = document.body.innerHTML.indexOf("},			m: {",0);
			}
		}
	}
	index1 = document.body.innerHTML.indexOf("url: '",index1) + 6;
var index2 = document.body.innerHTML.indexOf("',",index1);
var imgUrl = document.body.innerHTML.substring(index1,index2);

var oElement = document.evaluate('//h1[contains(@class, "photo-title")]', document, null, 7, null);
oElement.snapshotItem(0).parentNode.innerHTML = '<img src="' + imgUrl + '">' + oElement.snapshotItem(0).parentNode.innerHTML;

})();