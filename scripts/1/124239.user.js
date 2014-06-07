/* vim: ts=4 noet ai :
$Id: $

Link Original Image AllMod (2010-2012)
======================================
by Aganel
---------

ModVersion 1.30



ORIGINAL INFO
=============

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

Link Original Image AllMod
--------------------------

ModVersion 1.30 - 20120216
	- Added: GM option to switch links opening mode (in new tab or current tab)
	  and saving it to the localStorage

ModVersion 1.29 - 20120204
	- Added: https support for Flickr

ModVersion 1.28 - 20120127
	- Fixed: broken support for krazydad.com/gustavog
	- Fixed: broken support for fiveprime.org (flickrhivemind.net)
	- Fixed: broken support for fastr (http://randomchaos.com/games/fastr/)
	  and some other sites with old-type thumb links
	- Removed: support for http://images.insuggest.com, some adv site is there now
	- Removed: support for http://invitr.swal.org (no longer there)
	- Excluded flickr urls with /lightbox/
	
ModVersion 1.27 - 20120127
	- Fixed: thumbs regexp filter
	- Fixed: links to BIG images
	- Fixed: styles for unified look of the links

ModVersion 1.26 - 20100702
	- Fixed: wrong proccessing of _m postfix
	- Added: ORIG, BIG and MID (for copy-protected pics) links instead
	  of just ORIG
	- Slightly modified colors + bold font


Link Original Image (discontinued)
----------------------------------

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
// @name           Flickr Link Original Images AllMod
// @namespace      AgaMis
// @description    Add link to original (or large, or middle if original is missing) image on top of Flickr thumbnails
// @include        http:*flickr.com/photos/*
// @include        https:*flickr.com/photos/*
// @include        http:*flickr.com/search/*
// @include        https:*flickr.com/search/*
// @include        http:*flickr.com/groups/*
// @include        https:*flickr.com/groups/*
// @include        http:*chicksnbreasts.com/*
// @include        http://www.feedly.com/*
// @include        *www.google.com/reader/view/*
// @include        http://randomchaos.com/games/fastr/*
// @include        http://favcol.com/*
// @include        http://filmdev.org/*
// @include        http://color.slightlyblue.com/*
// @include        http://flickr-explorer.com/*
// @include        http://flickrhivemind.net/*
// @include        http://*krazydad.com/gustavog/*
// @include        http://www.flickriver.com/*
// @include        http://www.nyluke.com/geointerestingness/*
// @include        http://husk.org/
// @include        http://husk.org/code/machine-tag*
// @include        http://www.pixel-peeper.com/*
// @inlcude        http://photorater.org/*
// @include        http://www.postalz.com/*
// @include        http://www.theinternetinferno.com/*
// @include        http://www.tiltomo.com/*
// @include        http://www.compfight.com/*
// @exclude        http://www.flickr.com/photos/*/lightbox/
// @exclude        https://secure.flickr.com/photos/*/lightbox/
// @version        1.30
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
	newTab: true, // open links in new tab
	// funcs
	add: function(img, linkHref, label, nodetext) {
		this.hlist[img.src] = new ImgLink(img, linkHref, label, nodetext);
	},
	remove: function(img) {
		var obj = this.hlist[img.src];
		if (obj) {
			obj.removeIcon();
			delete this.hlist[img.src];
		}
	},
	insertLinks: function(doc) {
		// Example: http://farm8.staticflickr.com/7020/6494408999_0dc09f7854_s.jpg
		//          http://farm3.staticflickr.com/2549/4013650665_84e4b1eb7c_s.jpg
		//          http://farm3.static.flickr.com/2304/2433030429_78e47b078d_m.jpg
		
		// Getting the list of all images on the page
		var list = doc.getElementsByTagName("img");
		if ((0 === list.length) && (1 === doc.nodeType) && ("IMG" === doc.nodeName)) {
			list = [ doc ];
			myLog('doc: ' + doc);
		}
		
		// Processing every image (<img>) by the list
		for (var i = 0; i < list.length; i++) {
			var img = list[i];
			var href = img.getAttribute("src");
			myLog('href: ' + href);
			// only images with thumbnail signature
			// 
			try {
				var m = href.match(/(^.+static\.?flickr\.com.+\/)([0-9]+)_[0-9a-f]{10}_?.?\.jpg/);				
				if (m && m[2]) { // If href is a link to thumbnail
					myLog('isth: ' + href);
					// lookup "zoom page" for current photo (id)
					var thumbUrl = href;
					href = 'http://www.flickr.com/photo_zoom.gne?id=' + m[2] + '&size=o';
					var imgId = m[2];
					// Input:
					//   href — link to supposed page with original pic
					//   Result of getLookupFunc with following inputs:
					//     imgId — image id
					//     img — content of <img> tag
					ImgLinks.lookup(href, ImgLinks.getLookupFunc(imgId, img, thumbUrl));
				}
			} catch (e) {
				myLog('exception: ' + e);
			}
		}
	},
  // result parser func as closure
  // startUrl == ImgId — image id
  // img — content of <img> tag
  getLookupFunc: function(startUrl, img, thumbUrl) {
    return function resultParser(res) {
      try {
        txt = res.responseText;
        var re = new RegExp('<img src="([^"]+static[^"]+' + startUrl + '[^"]+)"');
        var m = txt.match(re);
        if (m) {
          myLog('matched: ' + m[0] + ', ' + m[1]);

          var orig = new RegExp('_o');
          var n = m[1].match(orig);
          if(n) {
            ImgLinks.add(img, m[1], "Flickr", "ORIG");
          }  else {
			ImgLinks.add(img, m[1], "Flickr", "BIG");
          }
        } else {
          if (txt.indexOf("Flickr: Private page") > -1) {
            myLog('No permission (zoom page): ' + startUrl);
            // FIXME: parse image source from overview page?
          } else if (txt.indexOf("The photo you were looking for has been deleted.") > -1) {
            myLog('Image Deleted');
            // FIXME: apply icon which indicates deleted image
          } else {
            //myLog('No image found (unknown) for ' + startUrl + '. Adding "ORIG" URL to standart size: ' + thumbUrl.replace('_t.jpg','.jpg') );
            ImgLinks.add(img, thumbUrl.replace('_t.jpg','.jpg').replace('_m.jpg','.jpg'), "Flickr", "MID");
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
		var origLIMainStyles = 
			'position: absolute; '+
			'top: 4px; left: -16px; '+
			'color: black;  background-color: white; '+
			'font-weight:bold; text-decoration: none; '+
			'padding: 1px; opacity: 1; '+
			'font-size: 10px; font-family: sans-serif; '+
			'border: 1px solid; border-color: white #555 #555 white;'+
			'z-index: 9999; '+
			'width:auto !important; height:auto !important; ';
		sty.insertRule('a.origLinkIcon { ' + origLIMainStyles + '}', 0);
		sty.insertRule('a.origLinkIcon:link { ' + origLIMainStyles + '}', 0);
		sty.insertRule('a.origLinkIcon:hover { color: black; background-color: silver !important; }', 0);
		sty.insertRule('.origLinkWrapper { position: relative; }', 0);
		sty.insertRule('.origLinkWrapper img { vertical-align: top; }', 0);
	},
	init: function() {
		myLog('init start');
		scriptOptions.init();
		this.addStyleRule();
		this.insertLinks(document);
		this.addEvtListeners();
		myLog('init done');
	}

};

// ImgLink Object, the icon on top of images
function ImgLink(img, linkHref, label, nodetext) {
	// try to find surrounding link element around image
	if (img.parentNode && ('origLinkWrapper' === img.parentNode.getAttribute('class'))) {
		myLog('already wrapped, skipping...');
		return;
	}
	var link = document.createElement("a");
	link.setAttribute("class", "origLinkIcon");
	link.setAttribute("href", linkHref);
	link.setAttribute("title", "Link to original uploaded image");
	link.appendChild(document.createTextNode(nodetext));
	link.addEventListener("click", function(evt) {
			// open in new tab
			if(ImgLinks.newTab)
				GM_openInTab(evt.target.href);
			// open in current tab
			else document.location = evt.target.href;
			evt.stopPropagation();
			evt.preventDefault();
		}, true);

	this.img = img;
	this.link = link;
		
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

var scriptOptions = {
	newTabOptionName: 'FlickrLinkOriginal_NewTab',
	lastError: '',
	
	init: function() {
		var that = this;
		
		var execNewTab = function() {
			ImgLinks.newTab = !ImgLinks.newTab;
			alert(
				'Now images will open in ' +
				(ImgLinks.newTab ? 'new' : 'current') + ' tab!\n' +
				(that.saveValue(that.newTabOptionName, ImgLinks.newTab) ?
				'Option value is saved for future.' :
				'Can\'t save option value, error: ' + that.lastError) 
			);
		}

		GM_registerMenuCommand("Switch opening links in new or current tab",
			execNewTab, "n");
		var newTab = this.readSavedValue(this.newTabOptionName);
		if(newTab !== null)
			ImgLinks.newTab = newTab;
	},
	
	saveValue: function(optionName, optionValue) {
		try {
			unsafeWindow.localStorage.setItem(optionName,
				JSON.stringify(optionValue));
		} catch(e) { this.lastError = e; return null; }
		return true;
	},
	
	readSavedValue: function(optionName) {
		try {
			var optionValue = unsafeWindow.localStorage.getItem(optionName);
		} catch(e) { this.lastError = e; return null; }
		return JSON.parse(optionValue);
	}
}

ImgLinks.init();


// end user script