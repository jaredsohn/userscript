// ==UserScript==
// @name           eHarmony Hidden Photos
// @description    Show "hidden" later stage photos
// @include        http://*.eharmony.com/singles/servlet/user/comm/review*
// ==/UserScript==
//
// Copyright (c) 2007, Matthew Botos (http://matthew.botos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

// find the photo cell
var photoCells = document.evaluate(
	"//td[@width='134']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

// create and insert link to photo page
photoLink = document.location.href.replace('user/comm/review', 'photos/matchview');
photoCells.snapshotItem(0).innerHTML = '<a href="' + photoLink + '">View Photos</a>';

// get and insert the first photo
GM_xmlhttpRequest({
	method: 'GET',
	url: photoLink,
	onload: function(responseDetails) {
		GM_log(responseDetails.responseText);
		firstPhoto = responseDetails.responseText.match('(<img [^>]*src="http://photos.eharmony[^>]*>)')[0];
		if (firstPhoto != null)
			photoCells.snapshotItem(0).innerHTML = '<a href="' + photoLink + '">' + firstPhoto + '</a>';
	}
});
