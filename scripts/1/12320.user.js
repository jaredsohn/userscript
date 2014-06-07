// Greasemonkey for Firefox: http://greasemonkey.mozdev.org/
///////////////////////////////////////////////////////////////////////////////
// smugmug.com: Bulk Zoom Thumbnails to Ratio  Version 1.0                   //
// Copyright 2007 Matt Wright                  http://www.scriptarchive.com/ //
// Created On: 2007-09-16                      Last Modified: 2007-09-16     //
///////////////////////////////////////////////////////////////////////////////
// This script relies on the layout and format of smugmug.com as of last     //
// modified date. Should you experience any problems, disable this script    //
// in greasemonkey and look for a newer version.                             //
///////////////////////////////////////////////////////////////////////////////
// Inspiration for some of this code was based on another tool by devbobo:   //
//    http://www.dgrin.com/showthread.php?t=26959                            //
///////////////////////////////////////////////////////////////////////////////
// COPYRIGHT NOTICE                                                          //
// Copyright 2007 Matthew M. Wright  All Rights Reserved.                    //
//                                                                           //
// Redistribution and use, with or without modification, are permitted       //
// provided that the following conditions are met:                           //
//                                                                           //
//   * Redistribution must retain the above copyright notice, this list of   //
//     conditions and the following disclaimer.                              //
//   * Neither the name Matt Wright or Matt's Script Archive may be used to  //
//     endorse or promote products derived from this software without        //
//     specific prior written permission.                                    //
//                                                                           //
// This software is provided "as is" and any express or implied warranties,  //
// including, but not limited to, the implied warranties of merchantability  //
// and fitness for a particular purpose are disclaimed. In no event shall    //
// Matt's Script Archive, Inc. or contributors be liable for any direct,     //
// indirect, incidental, special, exemplary or consequential damages         //
// (including, but not limited to, procurement of substitute goods or        //
// services; loss of use, data or profits; or business interruption) however //
// caused and on any theory of liability, whether in contract, strict        //
// liability, or tort (include negligence or otherwise) arising in any way   //
// out of the use of this software, even if advised of the possibility of    //
// such damage.                                                              //
///////////////////////////////////////////////////////////////////////////////
// CONFIGURATION                                                             //

// If you have a professional account and access smugmug through your own    //
// domain name, you will need to replace the *.smugmug.com domain in the     //
// line below that says:                                                     //
//   @include       http://*.smugmug.com/gallery/*                           //
// to read (use your actual domain instead of yoursmugmug.domain.com):       //
//   @include       http://yoursmumug.domain.com/gallery/*                   //

// You can set a default ratio below, using integers in the width,height     //
// ratio you desire. Otherwise, it will default to 'original'.               //

var defaultRatio = '1,1';

// END CONFIGURATION                                                         //
///////////////////////////////////////////////////////////////////////////////

// ==UserScript==
// @name          smugmug: Bulk Zoom Thumbnails to Ratio
// @namespace     http://www.scriptarchive.com/
// @description	  Zoom all thumbnails in a gallery to a specific ratio
// @include       http://*.smugmug.com/gallery/*
// ==/UserScript==

function gmShowPanel() {
	var numImages = unsafeWindow.imageIDs.length;
	var use_s = numImages == 1 ? '' : 's';

	var boxsize = parseInt(310 / Math.ceil(Math.sqrt(numImages))) - 1;

	var count = numImages-1;
	var panel_results = '';
	for (var bottom = 50; (bottom + (boxsize + 1)) <= 360; bottom += boxsize + 1) {
		for (var right = 25; (right + (boxsize + 1)) <= 335; right += boxsize + 1) {
			panel_results += '<div style="position: fixed; bottom: ' + bottom + 'px; right: ' + right + 'px; background-color: #666666; width: ' + boxsize + 'px; height: ' + boxsize + 'px;" id="bzti' + unsafeWindow.imageIDs[count] + '" title="' + unsafeWindow.imageIDs[count] + '"></div>'; 
			count--;
			if (count < 0) { break; }
		}
		if (count < 0) { break; }
	}

	var ratioOptions = new Array('1,1', '3,5', '4,6', '5,7', '8,10', '9,16');

	panel_options = '';
	var ratioFound = 0;
	for (var i = 0; i < ratioOptions.length; i++) {
		var selected = '';
		if (ratioOptions[i] == defaultRatio) {
			ratioFound = 1;
			selected = ' selected';
		}

		var whopt = ratioOptions[i].split(',');
		panel_options += '<option value="' + ratioOptions[i] + '"' + selected + '>' + whopt[0] + ' x ' + whopt[1] + '</option>';
	}

	var custom_h = 1;
	var custom_w = 1;
	var custom_selected = '';
	if (!ratioFound && defaultRatio.match(/^(\d+),(\d+)$/)) {
		custom_selected = ' selected';
		custom_h = RegExp.$1;
		custom_w = RegExp.$2;
	}

	var panel = document.createElement("div");
	panel.innerHTML = '<form name="bulkZoom_form" onsubmit="return false;"><div id="bulkZoom_panel" style="position: fixed; right: 10px; bottom: 10px; background-color: #666666; padding: 1px;"><div id="bulkZoom_paneli" style="background-color: #000000; color: #8CCA1E; width: 380px; height: 100px; padding: 2px;"><b style="font-size: 120%; padding-bottom: 2px; border-bottom: 1px solid #8CCA1E">Bulk Thumbnail Zoom (' + numImages + ' image' + use_s + ')</b><table cellpadding="2" cellspacing="0" border="0" style="padding-top: 5px; padding-left: 10px;"><tr><td style="color: #8CCA1E">Ratio:</td><td><select id="bulkZoomRatio" name="bulkZoomRatio" onchange="if(this.value==\'custom\'){document.getElementById(\'bulkZoomRatio_custom\').style.display=\'\';}else{document.getElementById(\'bulkZoomRatio_custom\').style.display=\'none\';}"><option value="original">original</option><option value="custom"' + custom_selected + '>custom</option>' + panel_options + '</select></td><td id="bulkZoomRatio_custom" style="color: #8CCA1E; display: ' + (custom_selected ? '' : 'none') + ';">&nbsp;<input type="text" id="bulkZoomRatio_h" name="bulkZoomRatio_h" value="' + custom_h + '" style="width: 25px;"> x <input type="text" id="bulkZoomRatio_w" name="bulkZoomRatio_w" value="' + custom_w + '" style="width: 25px;"></td><td style="color: #8CCA1E;">&nbsp;(height x width)</td></tr></table><div id="bulkZoom_results" style="color: #8CCA1E; display: none;"><div style="position: fixed; bottom: 364px; right: 360px; display: inline; background-color: #8C1E1E; width: 15px; height: 15px;"><div style="padding-left: 17px;">Retrieving...</div></div><div style="position: fixed; bottom: 364px; right: 240px; display: inline; background-color: #CACA1E; width: 15px; height: 15px;"><div style="padding-left: 17px;">Zooming...</div></div><div style="position: fixed; bottom: 364px; right: 120px; display: inline; background-color: #8CCA1E; width: 15px; height: 15px;"><div style="padding-left: 17px;">Complete</div></div>' + panel_results + '</div><div id="bulkZoom_buttons" style="position: fixed; bottom: 12px; right: 12px;"><input type="button" value="Cancel Zoom" id="bulkZoom_cancelbutton" onclick="gmCancelBulkZoom();" style="display: none;"> <input type="button" value="Zoom Thumbnails" id="bulkZoom_zoombutton" onclick="gmBulkZoomThumbnails();"> <input type="button" value="Close" onclick="document.getElementById(\'bulkZoom_panel\').style.display=\'none;\'"></div></div></div></form>';
		
	document.body.insertBefore(panel, document.body.firstChild);
}

unsafeWindow.gmCancelBulkZoom = function() {
	// This will skip any remaining items that have not been started...
	GM_setValue('fetchnum', unsafeWindow.imageIDs.length);

	// Return to state that doesn't show results...
	document.getElementById('bulkZoom_results').style.display ='none';
	document.getElementById('bulkZoom_paneli').style.height = '100px';
	document.getElementById('bulkZoom_zoombutton').style.display = '';
	document.getElementById('bulkZoom_cancelbutton').style.display = 'none';
}

unsafeWindow.gmBulkZoomThumbnails = function() {

	var ratio = document.getElementById('bulkZoomRatio').value;
	if (ratio == 'original') {
		GM_setValue('ratio', 'original');
	}
	else if (ratio == 'custom') {
		var ratio_h = document.getElementById('bulkZoomRatio_h').value;
		var ratio_w = document.getElementById('bulkZoomRatio_w').value;

		if (ratio_h != parseInt(ratio_h) || ratio_w != parseInt(ratio_w)) {
			alert('You must enter integer values for your custom ratio!');
			return;
		}

		GM_setValue('ratio', parseInt(ratio_h) + ',' + parseInt(ratio_w));
	}
	else if (ratio.match(/^\d+,\d+$/)) {
		GM_setValue('ratio', ratio);
	}
	else {
		alert('Invalid ratio selected!');
		return;
	}

	document.getElementById('bulkZoom_paneli').style.height = '420px';
	document.getElementById('bulkZoom_results').style.display ='';
	document.getElementById('bulkZoom_zoombutton').style.display = 'none';
	document.getElementById('bulkZoom_cancelbutton').style.display = '';

	requested = '';
	GM_setValue('imagesRequested', requested);
	GM_setValue('fetchnum', 0);

	fetchImageDetails();
};

window.fetchImageDetails = function() {
	var fetchnum = GM_getValue('fetchnum');
	GM_setValue('fetchnum', fetchnum + 1);

	if (fetchnum >= unsafeWindow.imageIDs.length) return;

	var imageID = unsafeWindow.imageIDs[fetchnum];

	if (imageID) {
		postArray = new Array();
		postArray['tool'] = 'lightBoxImage';
		postArray['ImageID'] = imageID;
		postArray['size'] = 'Original';
		postArray['pageType'] = unsafeWindow.pageType;
		postArray['pageTypeDetails'] = unsafeWindow.pageTypeDetails;
		postArray['siteUser'] = unsafeWindow.siteUser;

		requested = GM_getValue('imagesRequested').split(',');
		requested.push(imageID);
		GM_setValue('imagesRequested', requested.join(','));
		GM_setValue('fetched_' + imageID, false);
		GM_setValue('zoomed_' + imageID, false);

		updateStatus();

		unsafeWindow.ajax_query(unsafeWindow.processImageDetails, unsafeWindow.webServer+'/hack/RPC/gallery.mg', postArray, true);
	}
};

unsafeWindow.processImageDetails = function(response) {
	re = /\\\/photos\\\/(\d+)\-(O|L|M|S)(\-\d+)?\.jpg[\s\S]+,"newWidth":"(\d+)","newHeight":"(\d+)"/;
	re.exec(response);

	if (RegExp.$2 != "O") {
		alert("Need access to original photos!");
		return;
	}

	var imageID = RegExp.$1;
	var imgWidth = parseInt(RegExp.$4);
	var imgHeight = parseInt(RegExp.$5);

	if (imageID && imgWidth && imgHeight) {
		var ratio = GM_getValue('ratio');

		// default to original ratio
		var newWidth = imgWidth;
		var newHeight = imgHeight;
		var xOffset = 0;
		var yOffset = 0;

		if (ratio.match(/^(\d+),(\d+)$/)) {
			var ratio_h = RegExp.$1;
			var ratio_w = RegExp.$2;

			if (imgWidth / ratio_w < imgHeight / ratio_h) {
				newWidth = imgWidth;
				newHeight = parseInt((imgWidth / ratio_w) * ratio_h);
				xOffset = 0;
				yOffset = parseInt((imgHeight - newHeight) / 2);
			}
			else {
				newWidth = parseInt((imgHeight / ratio_h) * ratio_w);
				newHeight = imgHeight;
				xOffset = parseInt((imgWidth - newWidth) / 2);
				yOffset = 0;
			}
		}

		postArray = new Array();
		postArray['tool'] = 'newthumb';
		postArray['ImageID'] = imageID;
		postArray['action'] = "doit";
		postArray['crop_h'] = newHeight;
		postArray['crop_w'] = newWidth;
		postArray['crop_x'] = xOffset;
		postArray['crop_y'] = yOffset;

		unsafeWindow.ajax_query(unsafeWindow.thumbnailZoomed, unsafeWindow.webServer+'/photos/tools.mg', postArray, true);

		GM_setValue('fetched_' + imageID, true);
		updateStatus();
	}

	setTimeout(fetchImageDetails, 500); // Don't start more than 2 per second...
};

function updateStatus() {
	var numCompleted = 0;
	var requested = GM_getValue('imagesRequested').split(',');

	for (var i = 0; i < requested.length; i++) {
		if (!parseInt(i)) { continue; }

		var imageID = requested[i];
		var imageBox = document.getElementById('bzti' + imageID);

		if (!imageBox) { continue; }

		if (GM_getValue('zoomed_' + requested[i])) {
			imageBox.style.backgroundColor = '#8CCA1E';
			numCompleted++;
		}
		else if (GM_getValue('fetched_' + requested[i])) {
			imageBox.style.backgroundColor = '#CACA1E';
		}
		else {
			imageBox.style.backgroundColor = '#8C1E1E';
		}
	}

	if (numCompleted == unsafeWindow.imageIDs.length) {
		document.location.reload();
	}
}

unsafeWindow.thumbnailZoomed = function(response) {
	re = /\/cart\/batchadd.mg\?ImageID=(\d+)/;
	re.exec(response);

	if (RegExp.$1) {
		GM_setValue('zoomed_' + RegExp.$1, true);
		updateStatus();
	}
};

(function() {
	// Only make the greasemonkey options available if they are logged in, viewing
	// a gallery page and the page format is one that contains a list of images
	if (unsafeWindow.YD.hasClass(document.body, 'galleryPage') &&
	    unsafeWindow.YD.hasClass(document.body, 'loggedIn')) {
		if (unsafeWindow.YD.hasClass(document.body, 'traditional') ||
		    unsafeWindow.YD.hasClass(document.body, 'allthumbs') ||
		    unsafeWindow.YD.hasClass(document.body, 'filmstrip')) {
			if (unsafeWindow.imageIDs && unsafeWindow.imageIDs.length) {
				var imagecount = unsafeWindow.imageIDs.length;

				GM_setValue('ratio', 'original');
				GM_registerMenuCommand('Bulk Zoom Thumbnails to Ratio', gmShowPanel);
			}
		}
	}
})();
