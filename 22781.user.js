// ==UserScript==
// @name Flickr Mark Outdated Photos
// @namespace http://www.jakob.at/greasemonkey/
// @description Marks outdated photos on the flickr page, which shows recent photos from your contacts. Version 0.7
// @version 0.7 (2010-08-12)
// @creator Steffen A. Jakob (http://www.flickr.com/photos/steffenj/)
// @include http://*flickr.com/photos/friends*
// ==/UserScript==
//
// Copyright (C) 2008-2010 Steffen A. Jakob
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
// 2010-08-12 0.7 Adapted to new flickr layout
// 2008-04-09 0.6 Adapted to layout changes because of flickr's introduction of videos.
// 2008-02-19 0.5 Better performance.
// 2008-02-18 0.4 It's now possible to leave the contacts page before all photos have been examined.
// 2008-02-13 0.3 Support of URLs without trailing '/'
// 2008-02-13 0.2 It's now possible to use URLs without "www" (http://flickr.com/photos/friends/)
// 2008-02-12 0.1 First version

var nPhotos = 0; // total number of photos which are displayed on the contacts page
var nOutdated = 0; // the current number of outdated photos
var header = document.evaluate('//td[@class="Section"]/h1', 
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var oldHeaderText = header.firstChild.data; // the original h1 text (in english it's "Your contacts")
// Get all paragraphs which encapsulate the "recent" photos of the contacts.		
var recentParagraphs = document.evaluate(
	'//p[@class="RecentPhotos"]',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var visitedUrls = {}; // Users which have already been checked. We only want to verify the first photo (necessary if 5 photos/user are displayed)	
var currentPhotoIdx = 0; // the index of the currently examined photo.
var nCheckedPhotos = 0; // the number of already checked photos.
	
// Check all photos of the contacts page
nPhotos = recentParagraphs.snapshotLength;
// Start three searches in parallel.
var nParallelSearches = 4;
for (var i = 0; i < nParallelSearches; i++) {
	checkNextPhoto();
}

/**
 * Checks the next photo and calls itself recursively until all photos are examined.
 */
function checkNextPhoto() {
	currentPhotoIdx++;
	var i = currentPhotoIdx - 1;
	if (i < nPhotos) {
		var paragraph = recentParagraphs.snapshotItem(i);
		var image = paragraph.getElementsByTagName('img')[0];
		var refs = paragraph.getElementsByTagName('a');
		var imageUrl = refs[0];
		var userUrl = refs[refs.length-1].href;
		if (!(userUrl in visitedUrls)) {
			checkIfOutdated(userUrl, imageUrl, image);
			visitedUrls[userUrl] = true;
		}
		else {
			updateStatus();
			checkNextPhoto();
			nCheckedPhotos++;
		}
	}
}

/**
* Displays some information about the current verification state. The number of the already checked
* photos is displayed. If outdated photos are detected then the number will be displayed in red
* color.
*/
function updateStatus() {
	if(nCheckedPhotos < nPhotos) {
		header.firstChild.data = oldHeaderText + " (checking " + nCheckedPhotos + " / " + nPhotos + " photos)";
	}
	else if (nCheckedPhotos == nPhotos) {
		if(nOutdated == 0) {
			header.firstChild.data = oldHeaderText;
		}
		else {
			var photoStr = "photo";
			if (nOutdated > 1) {
				photoStr += "s";
			}
			header.firstChild.data = oldHeaderText + " (" + nOutdated + " outdated " + photoStr + ")";
		}
	}
	if(nOutdated > 0) {
		header.style.color = 'red';
	}
}

/**
 * Check if a picture is outdated. It is checked if the picture from the contacts page differs
 * from the picture of the photo page of the user. If the picture is outdated then it will be 
 * marked with a red border.
 *
 * @param userUrl The URL of the photo page of the user.
 * @param contactsImageUrl The URL of the image which is displayed in the contacts page.
 * @param image The image which is shown in the contacts page.
 */
function checkIfOutdated(userUrl, contactsImageUrl, image) {
	contactsImageUrl = ("" + contactsImageUrl).replace("/in/contacts", "");
	GM_xmlhttpRequest({
		method: 'GET',
		url: userUrl,
		onerror: function(responseDetails) {
			nCheckedPhotos++;
			nOutdated++;
			image.style.border = '5px solid red';
			updateStatus();
			checkNextPhoto();
		},
		onload: function(responseDetails) {
			nCheckedPhotos++;
			var content = responseDetails.responseText;
			var pattern = /(.*)photo_container(.*)<a href="([^"]+)"(.*)/;
			pattern.exec(content);
			if (!endsWith(contactsImageUrl, "flickr.com" + RegExp.$3)) {
				nOutdated++;
				image.style.border = '5px solid red';
			}
			updateStatus();
			checkNextPhoto();
		}
	});
}

/**
 * Tests if string 'str' ends with 's'.
 */
function endsWith(str, s) {
	var reg = new RegExp (s + "$");
	return reg.test(str);
}
