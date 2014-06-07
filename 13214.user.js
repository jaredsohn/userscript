// ==UserScript==
// @name           Reddit.com: Restore ability to continuously highlight text with your mouse 
// @description    
// @namespace      gcalpo
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

// This is in response to: http://reddit.com/info/5yw4h/comments/

//////////////////////////////////////////////////////////////
// IN THE COMMENTS, for DIV tags like
// <div style="overflow: hidden;" id="entry_t1_c02apbn">
// change the "overflow" property from hidden to visible
//////////////////////////////////////////////////////////////

var divs = document.getElementsByTagName('div');
var nrDivs = divs.length;
for (var i = 0; i < nrDivs; i++) {
	var thisDiv = divs[i];

	// change overflow property to 'visible' for divs like
	// <div style="overflow: hidden;" id="entry_t1_c02apbn">

	if (thisDiv.id.match(/entry_/)) {
		thisDiv.style.overflow = 'visible';

	}

	// also override the 'md' class 
	if (thisDiv.className == 'md') {
		thisDiv.style.overflow = 'visible'; 

	}

}	

