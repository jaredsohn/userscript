// ==UserScript==
// @name          Show Embedded.com images
// @description   Insert linked images directly inside the page.
// @include       http://www.embedded.com/*
// ==/UserScript==

var aElm = document.getElementsByTagName('a');
for (i=0; i<aElm.length; i++) {
	if (aElm[i].href.match(/\.(jpg|jpeg|gif|png)$/)) {
		var oImg = document.createElement('img');
		oImg.setAttribute('src',aElm[i].href);
		aElm[i].innerHTML = "";
		aElm[i].appendChild(oImg);
	}
}