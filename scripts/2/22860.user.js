// ==UserScript==
// @name Flickr Filter Hearts
// @namespace http://www.jakob.at/greasemonkey/
// @description This script filters images in photo comments to make the more readable. Version 0.12.
// @include http://*flickr.com/photos/*
// @include http://*flickr.com/
// @include http://*flickr.com/photos_comments.gne*
// @include http://*flickr.com/recent_activity.gne*
// @include http://*flickr.com/activity*
// @include http://*flickr.com/replies*
// @version 0.12 (2009-12-14)
// @creator Steffen A. Jakob (http://www.jakob.at/steffen/)
// ==/UserScript==
//
// Copyright (C) 2008-2009 Steffen A. Jakob
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
// http://www.gnu.org/copyleft/gpl.html
// or by writing to
// Free Software Foundation, Inc.
// 51 Franklin Street, Fifth Floor
// Boston, MA  02110-1301
// USA

// Changelog
// 2009-12-14 0.12 Filter images which are directly placed below a text link to a group.
// 2009-05-15 0.11 The script no longer changes comments of the picture owner (this was broken in the last version). 
//    Improved detection of group icons. Added a white list for some images.
// 2009-02-13 0.10 Adapted to changed layout. Remove linked images to groups completely.
// 2008-10-24 0.9 Keep images from the photostream of the commenter.
// 2008-09-11 0.8 Adapted script for new flickr layout.
// 2008-02-18 0.7 Keep images in comments from the owner of the photo.
// 2008-02-17 0.6 Filter images which are directly followed by a link to a group.
// 2008-02-16 0.5 Always filter images, which are linked to flickr groups.
// 2008-02-15 0.4 Keep external images.
// 2008-02-15 0.3 Keep inline defined images.
// 2008-02-15 0.2 Filter linked group icons which have a buddy icon URL.
// 2008-02-14 0.1 First version.

// Try to retrieve all images in comments from
// 1. a photo page
// 2. recent activites
// 3. recent comments

var images = document.evaluate(
	'//div[@id="DiscussPhoto"]//img |' +
	'//div[@class="act-content"]//img |' +
	'//div[@class="act-data"]//img |' +
	'//table[@class="NewComments"]//img',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

// Remember URLs of images in own comments. We want to keep them.
var ownImageUrls = {};
if (unsafeWindow.page_p != null && unsafeWindow.page_p.ownersUrl != null) {
	var ownImages = document.evaluate(
		'//li[contains(@class, "own-activity")]//img |' +
		'//div[@class="comment-block"]/div[contains(@class, "Who")]/a[@href="' + unsafeWindow.page_p.ownersUrl + '"]/../../..//img',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < ownImages.snapshotLength; i++) {
		ownImageUrls[ownImages.snapshotItem(i).src] = true;
	}
}

// The commenter is allowed to embed pictures from his own stream.
var commenterImages = {};
var links = document.evaluate(
	'//div[@class="comment-block"]/div[contains(@class, "comment-owner")]/a',
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) {
	var node = links.snapshotItem(i);
	var href = node.href;
	var pos = href.indexOf("/photos/")
	if (pos >= 0) {
		href = href.substr(pos)
	}
	var imgs = document.evaluate('//div[@class="comment-content"]//a[contains(@href, "' + href + '")]/img',
		node.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < imgs.snapshotLength; j++) {
		var node = imgs.snapshotItem(j);
		commenterImages[node.src] = true;
	}
}

var ImageType = { "keep" : 0, "group" : 1, "replace" : 2 };

// Examine all images and replace them if necessary.
for (var i = 0; i < images.snapshotLength; i++) {
	var image = images.snapshotItem(i);
	var type = isImportantImage(image);
	if (type != ImageType.keep) {
		replaceImage(image, type);
	}
}

// Checks if an image is important for the comment and should not be
// filtered.
function isImportantImage(image) {
	var src = image.src;
	
	// Flick specific icons e.g. the "pro" icon
	if (src.indexOf('flickr.com/images') >= 0) {
		return ImageType.keep;
	}
	// Keep inline images. These are sometimes used by other Greasemonkey
	// scripts like FlickrPM.
	if (src.indexOf('data:image') >= 0) {
		return ImageType.keep;
	}
	if (isLinked(image)) {
		// Filter images within links to groups.
		if (image.parentNode.href.indexOf('flickr.com/groups/') >= 0) {
			// White list
			if (image.parentNode.href.indexOf('handpickedguild') >= 0 || image.parentNode.href.indexOf('473902@N20') >= 0) {
				return ImageType.keep;
			}	
			return ImageType.group;
		}
	} else {
		// Filter images which are directly followed by a link to a group.
		var node = image.nextSibling;
		while (node != null && (node.nodeName == 'BR' || isEmptyTextNode(node))) {
			node = node.nextSibling;
		}
		if (node != null && node.nodeName == 'A' && node.href.indexOf('flickr.com/groups/') >= 0) {
			return ImageType.group;
		}
		
		// Filter images which are directly  placed below a  link to a group.
		node = image.previousSibling;
		while (node != null && (node.nodeName == 'BR' || isEmptyTextNode(node))) {
			node = node.previousSibling;
		}
		if (node != null && node.nodeName == 'A' && node.href.indexOf('flickr.com/groups/') >= 0) {
			return ImageType.group;
		}
	}
	// Keep external images.
	if (src.indexOf('http://') >= 0 || src.indexOf('https://') >= 0) {
		if (src.indexOf('flickr.com') < 0) {
			return ImageType.keep;
		}
	}
	// Keep buddy icons from users but filter icons from groups.
	if (src.indexOf('buddyicons') >= 0) {
		return ImageType.keep;
	}
	// Keep images in comments from the owner of the photo.
	if (src in ownImageUrls) {
		return ImageType.keep;
	}
	// Keep images from the photostream of the commenter.
	if (src in commenterImages) {
		return ImageType.keep;
	}
	// Everything else will be replaced.
	return ImageType.replace;
}

// Checks if the node is a text node with an empty or only whitespace and newline containing value.
function isEmptyTextNode(node) {
	if (node != null && node.nodeName == '#text') {
		if (node.nodeValue.replace(/[\n\s]*/,"") == '') {		
			return true;
		}
	}
	return false;
}

// Checks if an node is part of a hyperlink.
function isLinked(node) {
	return node.parentNode.nodeName == 'A';
}

// Creates a hyperlink for a text object.
function linkText(text, url) {
	var	link = document.createElement('a');
	link.setAttribute('href', url);
	link.appendChild(text);
	return link;
}

// Replace the image with a text and - if exists - the alternative text from the image.
// The text is linked to the image URL (which is only active if there wasn't a wrapping
// link around the image).
function replaceImage(image, type) {
	if (type == ImageType.group) {
		image.parentNode.removeChild(image)
	} else {
		var div = document.createElement('div');
		div.style.fontWeight = "bold";
		var newText = image.alt;
		if (newText != "") {
			newText = ' "' + newText + '"';
		}
		var text = document.createTextNode('[image' + newText + ']');
		if (!isLinked(image)) {
			var	link = linkText(text, image.src);
			div.appendChild(link);
		} else {
			div.appendChild(text);
		}
		image.parentNode.replaceChild(div, image);
	}
}
