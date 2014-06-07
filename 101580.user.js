// ==UserScript==
// @name           (dm) Drunken Step Father Link Swapper/Grabber
// @namespace      dsflinktools
// @description    Swap and grab Drunken Step Father image links to direct image links.
// @version        1.0.2
// @include        http://drunkenstepfather.com/*
// @match          http://drunkenstepfather.com/*
// ==/UserScript==

/*
 * Known Issues:
 *
 */

function cleanlink(url) {
	return url.replace(/\/(.*)-\d{1,6}x\d{1,6}\.([a-zA-z0-9]{3,4})/i, '/$1\.$2');
}

function swaplinks() {
	var image_container;
	var imgs,
	counter,
	tmpref;
	var embeds,
	embedsl,
	embedtmp1,
	embedtmp2,
	embedobj = {},
	embedcounter1,
	embedcounter2;
	var embedtmp1l,
	embedtmp2l;
	var urllist = [];
	//var content_regex = new RegExp("/cms/ul/", 'i');
	var content_regex = new RegExp("/wp-content\/uploads/", 'i');
	
	//image_container = document.getElementById('content');
	image_container = document.querySelector('div.post');
	
	// grab all images
	if (image_container) {
		imgs = image_container.getElementsByTagName("img");
	}
	
	// swap all the links to direct links.
	for (counter = 0; counter < imgs.length; counter += 1) {
		tmpref = imgs[counter].parentNode;
		
		// make sure the image is child of a link
		if (tmpref.nodeName === 'A') {
			// make sure the image points to something we care about not like a button or something
			if (content_regex.test(imgs[counter].src)) {
				tmpref.href = cleanlink(imgs[counter].src);
				urllist.push(tmpref.href);
			}
		}
	}
	
	embeds = image_container.getElementsByTagName('embed');
	embedsl = embeds.length;
	for (counter = 0; counter < embedsl; counter += 1) {
		embedtmp1 = embeds[counter].getAttribute('flashvars').split("&");
		embedtmp1l = embedtmp1.length;
		for (embedcounter1 = 0; embedcounter1 < embedtmp1l; embedcounter1 += 1) {
			embedtmp2 = embedtmp1[embedcounter1].split('=');
			embedtmp2l = embedtmp2.length;
			for (embedcounter2 = 0; embedcounter2 < embedtmp2l; embedcounter2 += 1) {
				embedobj[embedtmp2[0]] = embedtmp2[1];
			}
		}
	}
	if (embedobj['file']) {
		urllist.push(embedobj['file']);
	}
	showdump(urllist);
}

function showdump(urllist) {
	var urltxt = urllist.join('\r\n');
	var textbox = document.createElement("textarea");
	//var holder = document.getElementById('content').childNodes[3];
	var holder = document.querySelector('div.post').childNodes[3];
	if (!holder) {
		return; // we're not on a gallery page
	}
	textbox.style.width = '100%';
	textbox.style.height = '20px';
	textbox.innerHTML = urltxt;
	holder.insertBefore(textbox, holder.firstChild);
	
}

swaplinks();
