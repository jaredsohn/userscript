// ==UserScript==
// @name           (dm) CoEdMagazone.com Link Swapper/Grabber
// @namespace      coedmaglinktools
// @description    Swap and grab CoEdMagazine image links to direct image links.
// @version        1.0.1
// @include        http://coedmagazine.com/*
// @match          http://coedmagazine.com/*
// ==/UserScript==

/*
 * Known Issues:
 *
 */

function cleanlink(url) {
	return url.split('?')[0];
}

function showdump(urllist) {
	var urltxt = urllist.join('\r\n');
	var textbox = document.createElement("textarea");
	var holder = document.getElementById('gallery-wall-wrap');
	if (!holder) {
		return; // we're not on a gallery page
	}
	textbox.style.width = '100%';
	textbox.style.height = '20px';
	textbox.innerHTML = urltxt;
	holder.insertBefore(textbox, holder.firstChild);
}

function swaplinks() {
	var image_container,
		imgs,
		imgsl,
		counter,
		tmpref,
		urllist = [];
	
	image_container = document.getElementById('gallery-wall-wrap');
	
	// grab all images
	if (image_container) {
		imgs = image_container.getElementsByTagName("img");
	}
	
	imgsl = imgs.length;
	
	// swap all the links to direct links.
	for (counter = 0; counter < imgsl; counter += 1) {
		tmpref = imgs[counter].parentNode;
		
		// make sure the image is child of a link
		if (tmpref.nodeName === 'A') {
			tmpref.href = cleanlink(imgs[counter].src);
			urllist.push(tmpref.href);
		}
	}
	
	showdump(urllist);
}

if (document.getElementById('gallery-wall-wrap')) {
	swaplinks();
}
