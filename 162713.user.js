// ==UserScript==
// @name        Album Art Exchange Thumbnail Link Fixer
// @namespace   http://www.studio-nibble.com/gm/
// @description Corrects problem where AAX thumbnail links don't open the full-image page
// @include     http://www.albumartexchange.com/covers.php*
// @version     1.1
// ==/UserScript==

// 1.0 - 2013-03-21 - Initial Release
// 1.1 - 2013-03-22 - Gracefully handle images with no 'alt' attribute
// 1.2 - 2013-03-22 - Even more gracefully?

// AAX uses jQuery and we leverage it.

var AAXThumbLinkTarget = '_blank';	// _blank, _self, _parent, _top, etc.

var AAXThumbLinkFixer = {

	fixThumbnailLinks: function() {

		// Get a list of all anchors which are "pure" links to image pages.
		// We define this as anything with a query string containing ONLY
		// the "id=#" parameter.

		// Then take .each() of those anchors and append an additional "fake"
		// search parameter appropriate to the image.

		var imagePageAnchors = $('a')
			.filter(function() {
				return this.href.match(/^.+?id=([0-9]+)$/);
			})
			.each(function() {
				AAXThumbLinkFixer.replaceImagePageAnchor(this);
			});
	},

	replaceImagePageAnchor: function(anchor) {

		// The alt text on an image thumbnail at AAX is of the form "artist;
		// title; JPEG; image size". We pull out the artist and title and
		// append them as a "fake" search query to the image page URL.  One
		// nice side effect of this is that once you click through to the image
		// page itself all the other links (Thumbnail View, etc.) work as if
		// you really had found the image using that search.

		var images = $('img[alt]',anchor);
		if (images.length > 0) {
			var altMatch=images[0].alt.match(/^([^;]+?;[^;]+?);/);
			if (altMatch) {
				var anchor	= $(anchor);
				anchorHref	= anchor.attr('href');
					anchor.attr('href',anchorHref + '&q=' + encodeURIComponent(altMatch[1]));
				anchor.attr('target', AAXThumbLinkTarget);
			}
		}

		return;
	}
};

AAXThumbLinkFixer.fixThumbnailLinks();

// end user script