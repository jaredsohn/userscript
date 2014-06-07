// ==UserScript==
// @name           (dm) The Chive Link Swapper/Grabber
// @namespace      thechivelinktools
// @description    Swap and grab The Chive image links to direct image links.
// @version        1.0.1
// @include        http://thechive.com/*
// @match          http://thechive.com/*
// @include        http://*.thechive.com/*
// @match          http://*.thechive.com/*
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
	var holder = document.getElementById('gallery-1');
	if (!holder) {
		return; // we're not on a gallery page
	}
	textbox.style.width = '100%';
	textbox.style.height = '20px';
	textbox.innerHTML = urltxt;
	holder.insertBefore(textbox, holder.firstChild);
}

function swaplinks() {
	var image_container;
	var imgs,
		imgsl,
		counter,
		tmpref;
	var urllist = [];
	var galleryIDX = 0;
	while (true) {
		galleryIDX += 1;
		image_container = document.getElementById('gallery-' + galleryIDX);
		
		// grab all images
		if (image_container) {
			imgs = image_container.getElementsByTagName("img");
		} else {
			break;
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
		
	}
	showdump(urllist);
}

if (document.getElementById('gallery-1')) {
	swaplinks();
}
