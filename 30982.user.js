// ==UserScript==
// @name          Jamendo Direct Ogg Download
// @version       3
// @date          2012-10-21
// @description   Rewrites Jamendo's album download links to point to the direct-download Ogg Vorbis versions.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2012 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; ABSOLUTELY NO WARRANTY
// @resource      COPYING https://www.gnu.org/licenses/gpl-3.0.txt
// @grant         none
// @require       http://code.jquery.com/jquery-1.8.2.min.js
// @include       http://www.jamendo.com/*/list/a*/*
// ==/UserScript==

// shout-outs to: http://www.jamendo.com/en/forums/discussion/3972/site-bug-josh-woodward-simple-life-tracks-21-22-not-available-ogg-playlist/

// resolve jquery conflict: http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html
this.$ = this.jQuery = jQuery.noConflict(true);

var scriptTag = 'twos-jamendoogg'; // for marking our territory

$(document).ready(function() {
	document.addEventListener('DOMNodeInserted', updateUrl, true);
});

function updateUrl(event) {
	if (event.target.id == 'mboxLoadedContent') {
		var downloadBox = $(event.target);
		var albumDownloadLink = downloadBox.find('a.download').eq(0);
		if (!downloadBox.data(scriptTag) && albumDownloadLink) {
			// mark this download box as visited by the script, otherwise we will hit it twice
			downloadBox.data(scriptTag, 1);
			
			// remove text about this being an MP3 download
			var pTrackCount = downloadBox.find('p.size').eq(0);
			if (pTrackCount) {
				var trackCount = pTrackCount.html();
				var mp3index = trackCount.indexOf('(MP3, 192kbps)');
				if (mp3index >= 0) {
					pTrackCount.html(trackCount.substring(0, mp3index));
				}
			}

			// add ZIP link
			var albumId = window.location.href.match(/a\d+/);
			changeLinkText(albumDownloadLink, "http://api.jamendo.com/get/album/id/album/archiverestricted/redirect/" + albumId + "/?are=ogg3", 'Direct download', 'Ogg Vorbis q7 (ZIP)');
		}
	}
}

function changeLinkText(jqObj, url, row1text, row2text) {
	jqObj.attr('onclick', "window.location = '" + url + "'");
	var label = jqObj.find('.label').eq(0);
	label.html(row1text + '<small>' + row2text + '</small>');
}
