// ==UserScript==
// @name           Hide dpreview news images
// @namespace      http://www.pidcock.co.uk
// @description    Hide dpreview news images.
// @include        http://www.dpreview.com/
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var lDivs = divs.length;
for (var i = 0; i < lDivs; i++) {
	if (divs[i].className == 'bodytext clearfix') {
		// hide the images from news items
		var imgs = divs[i].getElementsByTagName('img');
		for (var iImg = 0; iImg < imgs.length; iImg++)
			hide(imgs[iImg]);
	}
}

function hide(element) {
	element.style.visibility = 'hidden';
	element.style.height = '0px';
	element.style.width = '0px';
}
