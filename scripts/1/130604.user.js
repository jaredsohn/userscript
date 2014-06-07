/*
Geocaching Gallery - v1.5 2010-02-11
(c) 2010, Prime Suspect Software

Greasemonkey user script: see http://greasemonkey.mozdev.org

Compatible with Greasemonkey 0.6.4.

Function:
 Changes all thumbnail images in a gallery to the medium
 size (300 pixel width) format. Clicking on a picture will
 display it full-size in a new tab. When viewing the system's
 gallery, or a cache page gallery, the image caption is 
 turned into a link, which will open the log containing that
 image in a new tab.

Change Log:

 v1.5 - 2010-02-11 Update to accomodate site changes.

 v1.4 - 2009-02-09 Added Banner Galleries.

 v1.3 - 2008-11-28 Update to accommodate site change.
 
 v1.2 - 2006-04-19 Update to accommodate change of image server name.
 f
 v1.1 - When viewing a log gallery, clicking on the caption
 now redisplays the page with that image in the viewbox. 
 Previously, the caption was not a link in log galleries. The
 change was necessary to allow log owners to select an image for
 editing, and to view notes attached to an image.

 v1.0 - Initial release

*/

// ==UserScript==
// @name           GC Gallery edit by Dangervisit 800px
// @namespace      http://www.dangervisit.de/
// @description    (v1.5) View All Gallery Images In Medium Format
// @include        http://*.geocaching.com/seek/log.aspx*
// @include        http://*.geocaching.com/track/log.aspx*
// @include        http://*.geocaching.com/seek/gallery.aspx*
// @include        http://*.geocaching.com/track/gallery.aspx*
// @include        http://*.geocaching.com/profile/Default.aspx*
// @include        http://*.geocaching.com/mark/log.aspx*
// @include        http://*.geocaching.com/Gallery/banners.aspx*
// ==/UserScript==

/* 
Gallery Type Upgrade Checklist
1. [X] Cache log gallery
2. [X] Cache page gallery
3. [X] Profile gallery
4. [X] Travel bug log gallery
5. [X] Travel bug page gallery
6. [X] Benchmark log gallery
7. [X] Banner gallery
 */

	//  Determine page type from URL.
	var PageType = 0;
	var PageUrl = document.location + '';
	
	//  Cache log gallery.
	if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/seek\/log\.aspx/i)) {
		PageType = 1;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_LogBookPanel1_GalleryList');

	//  Cache page gallery.
	} else if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/seek\/gallery\.aspx/i)) {
		PageType = 2;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_GalleryItems_DataListGallery');

	//  Profile gallery.
	} else if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/profile\/Default\.aspx/i)) {
		PageType = 3;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery');

	//  Travel bug log gallery.		
	} else if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/track\/log\.aspx/i)) {
		PageType = 4;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_LogBookPanel1_GalleryList');

	//  Travel bug page gallery.
	} else if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/track\/gallery\.aspx/i)) {
		PageType = 5;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_GalleryItems_DataListGallery');

	//  Benchmark log gallery.
	} else if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/mark\/log\.aspx/i)) {
		PageType = 6;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_LogBookPanel1_GalleryList');

	//  Banner gallery.
	} else if (PageUrl.match(/http:\/\/.*?\.geocaching\.com\/Gallery\/banners\.aspx/i)) {
		PageType = 7;
		e_Gallery_Table = document.getElementById('ctl00_ContentBody_GalleryItems_DataListGallery');
	}

	

	//  If not a gallery page, exit.
	if (PageType == 0) { return; }
	if (! e_Gallery_Table) { return; }

	
	//  Get list of images.
	if (PageType == 1) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/cache/log/thumb/')]";
	} else if (PageType == 2) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/cache/')]";
	} else if (PageType == 3) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/cache/log/thumb/')] " + 
				"| //img[contains(@src, 'http://img.geocaching.com/track/log/thumb/')]";
	} else if (PageType == 4) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/track/log/thumb/')]";
	} else if (PageType == 5) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/track/log/thumb/')] " + 
				"| //img[contains(@src, 'http://img.geocaching.com/track/thumb/')]";
	} else if (PageType == 6) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/benchmark/sm/')]";

	} else if (PageType == 7) {
		var xPathSearch = "//img[contains(@src, 'http://img.geocaching.com/cache/log/thumb/')] " + 
				"| //img[contains(@src, 'http://img.geocaching.com/track/log/thumb/')]";
	}
	
	
	var ImgList = document.evaluate(
		xPathSearch,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var ic = ImgList.snapshotLength;
	
	
	// If at least one image.
	if (ic < 0) {
		//  Rewrite thumbnail tables to have 2 images per row.
		var TabRows = e_Gallery_Table.rows.length - 1;
		//  Work from bottom to top of table.
		for (var i = TabRows; i >= 0; i--) {
			//  If more than 2 pictures in the row.
			var PixInRow = e_Gallery_Table.rows[i].cells.length;
			if (PixInRow > 1) {
				//  Create new row, and move extra columns to it.
				var TargetRow = e_Gallery_Table.insertRow(i + 1);
				for (var j = PixInRow - 1; j >= 1; j--) {
					TargetRow.insertBefore(e_Gallery_Table.rows[i].cells[j], 
							TargetRow.firstChild);
				}
			}
		}
		
		//  Change all thumbnail images to 800px display format.
		for (var i = 0; i < ic; i++) {
			var ThisImg = ImgList.snapshotItem(i);
			var ImgSrc = ThisImg.src;
			if (ImgSrc.match(/(\/thumb\/|\/sm\/)/)) {
				var ImgRaw = ImgSrc;
				if (PageType != 6) {
					ImgSrc = ImgSrc.replace(/\/thumb\//,'/display/');
					ImgRaw = ImgRaw.replace(/\/thumb\//,'/');
				} else {
					ImgSrc = ImgSrc.replace(/\/sm\//,'/');
					ImgRaw = ImgRaw.replace(/\/sm\//,'/lg/');
				}
				ThisImg.src = ImgSrc;
				ThisImg.removeAttribute('width');
			} else {
				ThisImg.removeAttribute('height');				// v1.3
				ThisImg.width = 800;
				ImgRaw = ImgSrc;
			}
			
			//  Change image link to show raw image in a new tab.
			var ThisImgLink = ThisImg.parentNode;
			var OldLink = ThisImgLink.href;
			ThisImgLink.href = ImgRaw;
			ThisImgLink.target = '_blank';
			ThisImgLink.title = 'Click image to view original image in new tab';
			
			//  If old image link pointed to log, attach that link to caption.
			//  Get text node.
			var LinkParent = ThisImgLink.parentNode;
			
			if (PageType == 2 || PageType == 3 || PageType == 5 || PageType == 7) {
				ImgCap = LinkParent.childNodes[7].firstChild.firstChild;
			} else {
				ImgCap = LinkParent.childNodes[2].firstChild;
			}
		
			//  If image from a log, make caption a link to that log.
			if (OldLink.match(/(seek|track|mark)\/log\.aspx/)) {
				var newLink = document.createElement("a");
				newLink.href = OldLink;
				if ((PageType != 1) && (PageType != 4) && (PageType != 6) && (PageType != 7)) {
					newLink.target = '_blank';
					newLink.title = "Click link to open the original log in new tab";
				} else {
					newLink.title = "Click link show this image in viewbox";
				}
				ImgCap.parentNode.insertBefore(newLink, ImgCap.nextSibling);
				newLink.appendChild(ImgCap);
				
			//  Otherwise, append note to caption indicating it's a cache page image.
			} else {
				if (PageType != 5) {
					var CapTag = '(cache page image)';
				} else {
					CapTag = '(travel bug page image)';
				}
				var lineBreak = document.createElement("br");
				ImgCap.parentNode.insertBefore(lineBreak, ImgCap.nextSibling);
				cpi = document.createTextNode(CapTag);
				lineBreak.parentNode.insertBefore(cpi, lineBreak.nextSibling);
			}
		}
	}

