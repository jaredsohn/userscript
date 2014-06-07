// ==UserScript==
// @name           MIX vimeo HD video
// @namespace      http://varomix.net
// @description    resizes the video player on vimeo to natural HD size 1280x720
// @include        https://*vimeo.com/*
// @version		   1.1
// @icon		   http://varomix.net/images/vimeohd.png
// ==/UserScript==

// find video frame divs
var videoDiv;
var holderDiv;
var scrollyDiv;
var divs = document.getElementsByTagName('div');
for (i = 0, j = 0; i < divs.length; i++) {
	if ( videoDiv == undefined && divs[i].id == 'clip' ) {
		//console.log("hey varomix");
		videoDiv = divs[i];
	}
	else if ( holderDiv == undefined && divs[i].className == 'player_container' ) {
		holderDiv = divs[i];

		
	}

}



// if these divs exist, we are on a video page:
if (videoDiv && holderDiv) {
	// resize main layout
	document.getElementById('main').setAttribute('style', 'width: 1280px;');


	document.getElementById('content').setAttribute('style', 'width: 1280px;');
	document.getElementById('clip').setAttribute('style', 'width: 1280px;');
	holderDiv.setAttribute('style', 'width: 1280px;height:720px');


}
