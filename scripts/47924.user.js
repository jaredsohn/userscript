/* vim: ts=4 noet ai :
$Id: $

Link Original Image - (c) 2005-2007 Johannes la Poutre

Greasemonkey User Script; looks for thumbnail images from Flickr.
Links these images to their original uploaded (full size) 
versions. This also works for any page where thumbnails are 
displayed directly from the Flickr servers.

The script adds an icon on top of thumbnail images.
Clicking this icon takes you to the original original 
uploaded photo version.

On March 1, 2007, flickr started to use a different naming
scheme for different image sizes. The work around is to
fetch the "zoom page" (the "all sizes" link with magnifying
glass) and extract the link to the original image from there.

Some users don't allow links to high resolutions from the
zoom page, in this case no "ORIG" icon will be displayed.

LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.20
	- Updated to work with images uploaded after March 1, 2007
	- Images without 'download' permissions won't be linked anymore
	- For every image, a page is fetched in the background

Version 1.10
	- Swapped Image link and thumbnail link (suggested by Sphere)
	- refactored repositioning method
	- added DOM event listeners to work with Ajax sites
	- now compatible with Creammonkey (0.6+) for Safari

Version 1.03
	- fix window resize
	- continuously recalculate link positions

Version 1.02
	- bugfix for FF 1.0x - thanks Antony den Dulk for pointing this out!

Version 1.01
	- much better link icon positioning (non W3C and with setTimeout
	  kludge, though)
	- added/edited a few more known flickr @include url's

Version 1.00
	- initial release

*/
// ==UserScript==
// @name           Flickr Link Original Images
// @namespace      http://joe.lapoutre.com/BoT/Javascript/
// @description    Add link to original image on top of Flickr thumbnails
// @include        http:*flickr.com/photos/*
// @include        http:*flickrlicio.us/*
// @include        http:*delivr.net/*
// @include        http:*flagrantdisregard.com/flickr/*
// @include		   http:*chicksnbreasts.com/*
// @include        http:*flickrbabes.com/*
// @exclude
// @version	       1.20
// ==/UserScript==

// use Firebug if available
function myLog(msg) {
	try {
		unsafeWindow.console.log(msg);
	} catch (e) {
		GM_log(msg);
	}
}

// global namespace
var ImgLinks = {
	hlist: {},
	tmr: null,
	// funcs
	add: function(img, linkHref, label) {
		this.hlist[img.src] = new ImgLink(img, linkHref, label);
	},
	remove: function(img) {
		var obj = this.hlist[img.src];
		if (obj) {
			obj.removeIcon();
			delete this.hlist[img.src];
		}
	},
	reshuffle: function() {
		for (var i in ImgLinks.hlist) {
			ImgLinks.hlist[i].reshuffle();
		}
	},
	// wait some millisecs to avoid very rapidly repeated invocation
	reshuffleSoon: function() {
		if (ImgLinks.tmr) clearTimeout(ImgLinks.tmr);
		ImgLinks.tmr = setTimeout(ImgLinks.reshuffle, 12);
	},
	insertLinks: function(doc) {
		// Example: http://static.flickr.com/33/55621048_77aea67ae5_m.jpg
		//          http://static.flickr.com/71/196046852_491ba6a98d_s.jpg
		//          http://static.flickr.com/184/404999942_d009ebdbb3.jpg
		// http://developer.mozilla.org/en/docs/DOM:document.evaluate
		var list = doc.getElementsByTagName("img");
		for (var i = 0; i < list.length; i++) {
			var img = list[i];
			var href = img.getAttribute("src");
			// only images with thumbnail signature
			// 
			var m = href.match(/(^.+static\.flickr\.com.+\/)([0-9]+)_[0-9a-f]{10}_?.?\.jpg/);
			if (m && m[2]) {
				// lookup "zoom page" for current photo (id)
				href = 'http://www.flickr.com/photo_zoom.gne?id=' + m[2] + '&size=o';
				var imgId = m[2];
				ImgLinks.lookup(href, ImgLinks.getLookupFunc(imgId, img));
			}
		}
	},
	// result parser func as closure
	getLookupFunc: function(startUrl, img) {
		return function resultParser(res) {
			try {
				txt = res.responseText;
				var re = new RegExp('<img src="([^"]+' + startUrl + '.+\.jpg)"');

				var m = txt.match(re);
				if (m) {
					ImgLinks.add(img, m[1], "Flickr");
				} else {
					if (txt.indexOf("Flickr: Private page") > -1) {
						myLog('No permission (zoom page)');
						// FIXME: parse image source from overview page
					} else if (txt.indexOf("The photo you were looking for has been deleted.") > -1) {
						myLog('Image Deleted');
						// FIXME: apply icon which indicates deleted image
					} else {
						myLog('No image found (unknown)');
myLog(txt);
					}
					return;
				}
			} catch(e) {
				myLog(e);
			}		
		}
	},
 	lookup: function(url, onload) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: { Referer: 'http://www.flickr.com/photos/' },
			onload: onload
		});
	},


	addEvtListeners: function() {
		// Ajax: new image
		document.addEventListener("DOMNodeInserted",
			function(evt) {
				// myLog(evt);
				try {
					// will fail if new node is not ElementNode
					ImgLinks.insertLinks(evt.target);
				} catch (e) {}
			}, true);
		// Ajax: remove an image
		document.addEventListener("DOMNodeRemoved",
			function(evt) {
				// myLog(evt);
				try {
					var list = evt.target.getElementsByTagName("img");
					for (var i = 0; i < list.length; i++) {
						ImgLinks.remove(list[i]);
					}	
				} catch (e) {}
			}, true);
		// DOM manipulation, which can cause reflow
		document.addEventListener("DOMAttrModified",
			function(evt) {
				// myLog(evt);
				ImgLinks.reshuffleSoon();
			}, true);
		// catch window resize events
		window.addEventListener("resize",
			function() { ImgLinks.reshuffle(); }, true);
		// catch any unnoticed change, for Safari / Creammonkey
		setInterval(ImgLinks.reshuffleSoon, 500);
	},
	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule('a.origLinkIcon { position: absolute; top: 4px; left: 4px; color: black;  background-color: silver; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 8px; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; }', 0);
		sty.insertRule('a.origLinkIcon:hover { color: black; background-color: yellow; }', 0);
	},
	init: function() {
		this.addStyleRule();
		this.insertLinks(document);
		this.addEvtListeners();
	}

};

// ImgLink Object, the icon on top of images
function ImgLink(img, linkHref, label) {
	// try to find surrounding link element around image
	var link = document.createElement("a");
	link.setAttribute("class", "origLinkIcon");
	link.setAttribute("href", linkHref);
	link.setAttribute("title", "Link to original uploaded image");
	link.appendChild(document.createTextNode("ORIG"));
	this.img = img;
	this.link = link;
	this.reshuffle();
	document.getElementsByTagName("body")[0].appendChild(link);
}
ImgLink.prototype.removeIcon = function() {
	this.link.parentNode.removeChild(this.link);
}
ImgLink.prototype.reshuffle = function() {
	// computedStyle gives "auto" for position, 
	// if not set through CSS.
	// To be sure, calculate the positions of
	// all parent elements on the page
	var top = 4;
	var left = 4;
	var obj = this.img;
	while (obj.offsetParent) {
		top += obj.offsetTop;
		left += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	this.link.style.top = top + "px";
	this.link.style.left = left + "px";
//	this.link.display = ("hidden" == this.img.style.visibility) ? "none" : "inline";
}





ImgLinks.init();
/*
ImgLinks.addStyleRule();
ImgLinks.insertLinks(document);
ImgLinks.addEvtListeners();
*/

// end user script
