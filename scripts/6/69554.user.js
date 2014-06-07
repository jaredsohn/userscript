// ==UserScript==
// @name           What.CD LaTeX Whiteifier
// @namespace      what.cd
// @description    Make LaTeX created from the [tex] tag use a white font
// @include        http*://*.what.cd/*
// ==/UserScript==

for (var i = document.images.length - 1; i >= 0; i--) {
	var thisImage = document.images[i];
	if (thisImage.src.indexOf('chart.apis.google.com') != -1 && thisImage.src.indexOf('cht=tx') != -1) {
		var whiteified = new Image();
		whiteified.src = thisImage.src + '&chco=FFFFFF';
		thisImage.parentNode.replaceChild(whiteified, thisImage);
	}
}