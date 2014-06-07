// This user script makes product images on Amazon.com as large as possible.
// This is primarily useful for gathering album art for your music collection,
// but is also effective eye candy.  As a side effect all those tacky "search
// inside this book" tags are eliminated.
//
// This script has been tested on amazon.com, amazon.co.uk, and amazon.co.jp.
// It works on normal product pages, but may not on pages with atypical layout,
// such as those for the Kindle devices.  Images with annotations are
// unaffected (lest the annotations break).

// ==UserScript==
// @name           Amazon Large Images
// @version        7
// @namespace      http://freecog.net/2006/
// @description    Makes product images on Amazon.com as large as possible.
// @include        http://*.amazon.tld/*
// @include        http://amazon.tld/*
// @grant          none
// ==/UserScript==


/* Changelog:

Version 7, 1 February 2014
* Fixed to work with changes to Amazon's pages.  Seems to work for CDs I've
  tried, but not books (which use a different "look inside" widget).

Version 6, 11 October 2012
* Trivial lint fixes

Version 5, 6 September 2012
* Make things shift around a bit less when alternative images load.  Now
  the buttons will never shift up, only down.
* Add @grant none; switch from GM_log and remove GM_getValue.
* Switch to MutationObserver from DOM mutation events (performs much better).
  This means Firefox 14 or later is required.
* Remove const (it might work in Chrome now).
* Reformat things a bit.

Version 4, 25 August 2008:
* Fixed to work with changes to Amazon's pages.

Version 3, 17 April 2007:
* Updated the @includes--Amazon doesn't seem to require the www prefix anymore.

Version 2, 27 Feb 2007:
* Fixed a bug that caused certain customer images to not be resized.
* Fixes the issue with the text overlapping a large image.

Version 1: Initial public release

*/

(function() {

var DEBUG = false;

// If you want to set a custom format change this constant.  The default
// simply shows the largest image available.  For more on these codes go to
// http://aaugh.com/imageabuse.html.  Also note that you'll need to escape any
// regular expression metacharacters in the string you specify.
var ali_format = '_SCLZZZZZZZ_';

function msg() {
    if (DEBUG && window.console && window.console.log) {
        window.console.log.apply(window.console, arguments);
    }
}

// Function to replace an image URL's format specifier with `ali_format`.
function src_to_large(src) {
    var replacement = "." + ali_format + '$1.$2$3';
    var result = src.replace(/\._[^\.]+?_(\.L)?\.(jpe?g|gif|png)("|'|$)/, replacement);
    msg("Converting %s to %s", src, result);
    return result;
}

var g_width = 0;
var g_height = 0;

function fix_images() {
    Array.forEach(g_container.querySelectorAll('.holder.image img, .holder.ciu img'), function(img) {
        img.addEventListener('load', function(event) {
            var img = event.target;
            if (img.width > g_width || img.height > g_height) {
                g_width = Math.max(g_width, img.width);
                // The +10 is for the padding on the bottom of the cell.
                g_height = Math.max(g_height, img.height + 10);
                g_container.style.width = g_width + 'px';
                g_container.style.height = g_height + 'px';
                msg('Minimum size of container %o increased to (%o, %o)', g_container, g_width, g_height);
            }
        }, false);
        img.src = src_to_large(img.src);
        msg("Fixed image %o", img);
    });
}

// Find the product image and change its size.
var g_container = document.getElementById('main-image-relative-container');
if (g_container) {
    msg("Found product image widget; fixing %o", document.location.href);
    fix_images();

    // Remove size restrictions
    var node = g_container;
    while ((node = node.parentNode)) {
        [node.width, node.height] = ['', ''];
        [node.style.width, node.style.height] = ['auto', 'auto'];
        if (node.className === 'productImageGrid') {
            break;
        }
    }

    var observer = new MutationObserver(function() {
        msg("Fixing due to subtree");
        fix_images();
    });
    observer.observe(g_container.parentNode, {subtree: true, childList: true});

} else {
    msg("Product image not found for %o", document.location.href);
}

}());
// vim: ts=4 sts=4 sw=4 et
