// ==UserScript==
// @name           vimeo bigger video
// @namespace      http://goodsoul.de
// @description    resizes the video player on vimeo
// @include        http://*vimeo.com/*
// ==/UserScript==

// find video frame divs
var videoDiv;
var holderDiv;
var scrollyDiv;
var divs = document.getElementsByTagName('div');
for (i = 0, j = 0; i < divs.length; i++) {
	if ( videoDiv == undefined && divs[i].className == 'video' ) {
		videoDiv = divs[i];
	}
	else if ( holderDiv == undefined && divs[i].className == 'vimeo_holder' ) {
		holderDiv = divs[i];
	}
	// somehow it won't work with if == undefined :/ *shrug*
	else if ( divs[i].className == 'softcorner native scrolly_container' ) {
		scrollyDiv = divs[i].childNodes[1];
	}
}

// if these divs exist, we are on a video page:
if (videoDiv && holderDiv) {
	// resize main layout
	document.getElementById('main').setAttribute('style', 'width: 1200px;');
	document.getElementById('everything').setAttribute('style', 'width: 1200px;');
	// resize video
	videoDiv.setAttribute('style', 'width: 860px;');
	holderDiv.setAttribute('style', 'position:relative;width:860px;height:480px');
	// resize scrolly thing:
	scrollyDiv.setAttribute('style', 'width:240px;height:372px');
	var flashBarDiv = scrollyDiv.childNodes[3];
	scrollyDiv.removeChild(flashBarDiv);
	scrollyDiv.childNodes[1].setAttribute('style','overflow:auto;width:240px;height:372px');
}

