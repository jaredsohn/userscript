// ==UserScript==
// @name		DVDCoversFuzion Grabber
// @namespace		dvdcoversfuzion
// @description		Grab original full-size covers from dvdcoversfuzion.com
// @include		http://www.dvdcoversfuzion.com/gallery/browseimages.php*
// ==/UserScript==

window.addEventListener('load', function() {
	var images = document.getElementsByTagName('img');
	
	for(var i = 0; i < images.length; i++) {
		var src = images[i].src;
		
		if(src.match('_thumb')) {
			images[i].parentNode.href = src.replace('_thumb', '_original');
		}
	}
}, true);
