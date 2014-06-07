/* vim: ts=4 noet ai :
$Id: $

Link Original Image - (c) 2005-2009 Johannes la Poutre

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

Version 1.27
	- Works with the latest Flickr updates
        - Like the original, opens images in a new tab.

Version 1.25 - 20090402
	- added Flickr search results and some more to enabled sites


Version 1.24 - 20090305
	- ORIG icon is now on top of anotation comment areas
	- added new flickr enabled sites, removed old ones
	  Find more include links via http://www.flickrbits.com/

Version 1.23 - 20090305
	- Replaced kludgy absolute positioning and shuffeling by wrapper element
	- Compatibility with feedly as requested by viisiix
	- Links now open in a new browser tab.

Version 1.22 - 20080429
	- improved handling when original is not available (contributed by David Lin)
	- Security fix (GM security update since v0.7.20080121)

Version 1.21 - 20080103
	- Update for flickrleech.net
	- no more logging attempts through unsafeWindow


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
// @name           Flickr Link Original Images (New Tabs)
// @namespace      http://joe.lapoutre.com/BoT/Javascript/
// @description    Add link to original image on top of Flickr thumbnails
// @include        http:*flickr.com/photos/*
// @include        http:*flickr.com/search/*
// @include        http:*chicksnbreasts.com/*
// @include        http:*flickr.com/groups/*/pool/*
// @include        http://www.feedly.com/*
// @include        *www.google.com/reader/view/*
// @include        http://randomchaos.com/games/fastr/*
// @include        http://favcol.com/*
// @include        http://filmdev.org/*
// @include        http://color.slightlyblue.com/*
// @include        http://flickr-explorer.com/*
// @include        http://fiveprime.org/*
// @include        http://www.krazydad.com/gustavog/*
// @include        http://www.flickriver.com/*
// @include        http://www.nyluke.com/geointerestingness/*
// @include        http://images.insuggest.com/*
// @include        http://husk.org/code/machine-tag*
// @include        http://www.pixel-peeper.com/*
// @inlcude        http://photorater.org/*
// @include        http://www.postalz.com/*
// @include        http://www.theinternetinferno.com/*
// @include        http://www.tiltomo.com/*
// @include        http://www.compfight.com/*
// @include        http://invitr.swal.org/*
// @exclude
// @version        1.26
// ==/UserScript==

// use Firebug if available
function myLog(msg) {
	return; // do not use in production...
	try {
		unsafeWindow.console.log(msg);
		GM_log(msg);
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
	insertLinks: function(doc) {
		// Example: http://static.flickr.com/33/55621048_77aea67ae5_m.jpg
		//          http://static.flickr.com/71/196046852_491ba6a98d_s.jpg
		//          http://static.flickr.com/184/404999942_d009ebdbb3.jpg
		//          http://static.flickr.com/2131/2158996681_eeb43c0750_s.jpg
		// http://developer.mozilla.org/en/docs/DOM:document.evaluate
		// myLog(doc);
		var list = doc.getElementsByTagName("img");
		if ((0 === list.length) && (1 === doc.nodeType) && ("IMG" === doc.nodeName)) {
			list = [ doc ];
			// myLog(doc);
		}
		for (var i = 0; i < list.length; i++) {
			var img = list[i];
			var href = img.getAttribute("src");
			// myLog(href);
			// only images with thumbnail signature
			// 
			try {
				var m = href.match(/(^.+static\.flickr\.com.+\/)([0-9]+)_[0-9a-f]{10}_?.?\.jpg/);
				if (m && m[2]) {
					myLog(href);
					// lookup "zoom page" for current photo (id)
					href = 'http://www.flickr.com/photo_zoom.gne?id=' + m[2] + '&size=o';
					var imgId = m[2];
					ImgLinks.lookup(href, ImgLinks.getLookupFunc(imgId, img));
				}
			} catch (e) {
				myLog(e);
			}
		}
	},
  // result parser func as closure
  getLookupFunc: function(startUrl, img) {
    return function resultParser(res) {
      try {
        txt = res.responseText;
        var re = new RegExp('<img src="([^"]+static[^"]+' + startUrl + '[^"]+)"');
        var m = txt.match(re);
        if (m) {
          myLog('matched: ' + m[0] + ', ' + m[1]);
          ImgLinks.add(img, m[1], "Flickr");
        } else {
          if (txt.indexOf("Flickr: Private page") > -1) {
            myLog('No permission (zoom page): ' + startUrl);
            // FIXME: parse image source from overview page?
          } else if (txt.indexOf("The photo you were looking for has been deleted.") > -1) {
            myLog('Image Deleted');
            // FIXME: apply icon which indicates deleted image
          } else {
            myLog('No image found (unknown)');
			//myLog(txt);
          }
          return;
        }
      } catch(e) {
        myLog('getLookupFunc: ' + e);
      }   
    }
  },
  	// secrurity wrapper as of GM v0.7.20080121
  	// @see http://wiki.greasespot.net/0.7.20080121.0_compatibility
	lookup: function(url, onload) {
		if (url.match(/^http:\/\/(\w+\.)*?flickr\.com\/.+/)) {
			// call wrapped lookup function
			window.setTimeout(ImgLinks._wrappedLookup, 0, url, onload);
		} else {
  	      myLog('lookup: security breach with url ' + url);
		}
	},

	_wrappedLookup: function(url, onload) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: { Referer: 'http://www.flickr.com/photos/' },
				onload: onload
			});
		} catch (e) {
			myLog('_wrappedLookup: ' + e);
		}
	},

	addEvtListeners: function() {
		// Ajax: new image
		document.addEventListener("DOMNodeInserted",
			function(evt) {
				// myLog(evt);
				try {
					// will fail if new node is not ElementNode
					ImgLinks.insertLinks(evt.target);
					// myLog(evt.target);
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
		// DOM manipulation, which can cause reflow not needed as of rev 1.23
	},
	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule('a.origLinkIcon { position: absolute; top: 4px; left: 4px; color: black;  background-color: silver; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 8px; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; z-index: 9999; }', 0);
		sty.insertRule('a.origLinkIcon:hover { color: black; background-color: yellow; }', 0);
		sty.insertRule('.origLinkWrapper { position: relative; }', 0);
		sty.insertRule('.origLinkWrapper img { vertical-align: top; }', 0);
	},
	init: function() {
		myLog('init start');
		this.addStyleRule();
		this.insertLinks(document);
		this.addEvtListeners();
		myLog('init done');
	}

};

// ImgLink Object, the icon on top of images
function ImgLink(img, linkHref, label) {
	// try to find surrounding link element around image
	if (img.parentNode && ('origLinkWrapper' === img.parentNode.getAttribute('class'))) {
		myLog('already wrapped, skipping...');
		return;
	}
	var link = document.createElement("a");
	link.setAttribute("class", "origLinkIcon");
	link.setAttribute("href", linkHref);
	link.setAttribute("title", "Link to original uploaded image");
	link.appendChild(document.createTextNode("ORIG"));
        link.addEventListener("click", function(evt) {
			GM_openInTab(evt.target.href);
			evt.stopPropagation();
			evt.preventDefault();
		}, true);


	this.img = img;
	this.link = link;
		
	// document.getElementsByTagName("body")[0].appendChild(link);
	var wrapper = img.parentNode;
	if (!wrapper || (1 !== wrapper.nodeType)) {
		wrapper = document.createElement('span');
		img.parentNode.appendChild(wrapper);
		wrapper.appendChild(img);
	}
	var cls = wrapper.getAttribute('class');
	if (!cls) cls = 'origLinkWrapper';
	if (cls.indexOf('origLinkWrapper') === -1) cls += ' origLinkWrapper';
	wrapper.setAttribute('class', cls);
	wrapper.appendChild(link);
}
ImgLink.prototype.removeIcon = function() {
	this.link.parentNode.removeChild(this.link);
}


ImgLinks.init();


// end user script