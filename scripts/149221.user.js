// ==UserScript==
// @name        WikipediaHighRes
// @namespace   nothing
// @description Loads images on Wikipedia with double resolution, suitable for Retina displays
// @include     http://*.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @include     http://*.wikimedia.org/*
// @include     https://*.wikimedia.org/*
// @include     http://*.wikinews.org/*
// @include     https://*.wikinews.org/*
// @include     http://*.wikiquote.org/*
// @include     https://*.wikiquote.org/*
// @include     http://*.wikisource.org/*
// @include     https://*.wikisource.org/*
// @include     http://*.wikibooks.org/*
// @include     https://*.wikibooks.org/*
// @include     http://*.wikiversity.org/*
// @include     https://*.wikiversity.org/*
// @include     http://*.wiktionary.org/*
// @include     https://*.wiktionary.org/*
// @include     http://*.wikia.com/*
// @include     https://*.wikia.com/*
// @include     http://*.fanhistory.com/*
// @include     https://*.fanhistory.com/*
// @include     http://*.wikihow.com/*
// @include     https://*.wikihow.com/*
// @include     http://wiki-de.genealogy.net/*
// @include     https://wiki-de.genealogy.net/*
// @include		http://www.wowwiki.com/*
// @include		https://www.wowwiki.com/*
// @version     1.0
// ==/UserScript==

var origRE = /(^.*)\/thumb(\/.*\/[^\/]+\.(?:jpg|png|gif))\/\d+px-[^\/]+\.(?:jpg|png|gif)$/
var thumbnailRE = /(^.+\/thumb\/.*\/)(\d+)(px-[^\/]+)$/

function setSrc(img, width, newSrc) {
	var oldSrc = img.src;
	img.style.width = "" + width + "px";
	img.src = newSrc;
	img.onerror = function() {
		// The original image is probably smaller than 2x the thumbnail size. Use the
		// original image instead.
		var match = origRE.exec(oldSrc);
		if (match) {
			var prefix = match[1];
			var suffix = match[2];
			var src = prefix + suffix;
			img.src = src
			img.onerror = function() {
				img.src = oldSrc;
			}
		}
		else {
			img.src = oldSrc;
		}
	}
}

var imgs = document.evaluate('//img', 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < imgs.snapshotLength; i++) {
	var img = imgs.snapshotItem(i);
	
	var thumbMatch = thumbnailRE.exec(img.src);
	if (thumbMatch) {
		var prefix = thumbMatch[1];
		var width = parseFloat(thumbMatch[2]);
		var suffix = thumbMatch[3];
		var newSrc = prefix + Math.round(width*2) + suffix;
		setSrc(img, width, newSrc);			
	}
}
	


