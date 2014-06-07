// ==UserScript==
// @name           Flickr Image Src Exposer
// @namespace      thehuey.com
// @description    Exposes the static image URL
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// ==/UserScript==

var link = document.createElement('A');
var myurl = '' + document.location;
myurl = myurl.replace(/http:\/\/.*\.com\/photos\/[^\/]+\/(\d+)\/.*$/, "$1");
var imgdivel = document.getElementById('photoImgDiv' + myurl);

var i = 0;
for (i;i<imgdivel.childNodes.length;i++) {
var imgel = imgdivel.childNodes[i];
  if (imgel.nodeName.match(/img/i) && !imgel.src.match(/spaceball.gif/i)) {
	var imgsrc = imgel.src;
	link.href = imgsrc;

	link.appendChild(document.createTextNode("IMG LINK "));
	var allsize = document.createElement('A');
	allsize.href= 'http://www.thehuey.com/flickr/?u=' + imgsrc;
	allsize.appendChild(document.createTextNode("  All Available Sizes  "));
	imgdivel.appendChild(link);
	imgdivel.appendChild(document.createTextNode(" - "));
	imgdivel.appendChild(allsize);
  }
}


