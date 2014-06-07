// ==UserScript==
// @name			Linked Image Viewer
// @description		Display linked images on hover. View full images by hovering over the link.
// @include			*
// @namespace		http://www.orange-byte-design.com
// ==/UserScript==

// If image is larger than the browser it will be reduced to 100% of browser size it's larger than.
// Clicking generated image will act as clicking on thumbnail or link. 
// So if the site usees a lightbox or anything similar it should open in that.


var imageStyle = document.createElement('style');
imageStyle.setAttribute('type','text/css');
var css = 'a.viewImage img.viewImage { z-index:1000; display: none; position: fixed; left: 0; top: 0; max-width: 100%; max-height: 100%; margin: 0; border: none; }';
css += 'a.viewImage:hover img.viewImage { display: block; }';
imageStyle.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(imageStyle);

var images = document.getElementsByTagName('a');
for (i=0; i<images.length; i++) {
	if (images[i].href.match(/\.(jpg|jpeg|gif|png)$/)) {
		var imageHover = document.createElement('img');
		imageHover.setAttribute('src',images[i].href);
		imageHover.setAttribute('class','viewImage');
		images[i].appendChild(imageHover);
		images[i].setAttribute('class','viewImage');
	}
}