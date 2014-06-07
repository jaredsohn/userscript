// *** WARNING ***
// This script works by fetching all track pages for a given PUID.
// This is not light on the MB server. Please use it sparingly.
// *** WARNING ***
//
// version 0.1 alpha1, 2008-05-28
//
// Copyright (c) 2008, Ionut Ciocirlan
// You can use this code under the GPL license, version 3 or later.
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          MusicBrainz PUID removal
// @description   Add "Remove PUID for this track" links to tracks listed on the MusicBrainz PUID page
// @include       http://musicbrainz.org/show/puid/?puid=*
// ==/UserScript==


var templateLink = document.createElement('a');
templateLink.setAttribute('title', 'Remove PUID for this track');
templateLink.appendChild(document.createTextNode('X'));
templateLink.style.display = 'none';
templateLink.style.width = '18px';
templateLink.style.cssFloat = 'right';
templateLink.style.textAlign = 'center';
templateLink.style.fontWeight = 'bold';
templateLink.style.color = 'red';
templateLink.style.border = '1px solid red';

var urlmatch = window.location.search.match(/^\?puid=([^&]+)(&matchesonly=0)?$/);

// are we on a "Show all tracks" page?
var showsAll = false;
if (urlmatch[2]) showsAll = true;

var pweedRe = new RegExp('\\[ <a href="(/edit/puid/remove\\.html\\?trackid=[0-9]+&amp;puid=' + urlmatch[1] +'&amp;PUIDjoin=[0-9]+)">remove</a> \\]');

function prepRemoveLink(trackurl) {
	var removeLink = templateLink.cloneNode(true);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: trackurl,
		onload: function(responseDetails) {
			if (responseDetails.status != 200) return;
			var removeUrl = responseDetails.responseText.match(pweedRe)[1].replace(/&amp;/g, '&');
			removeLink.href = removeUrl;
			removeLink.style.display = 'block';
		}
	});
	return removeLink;
}

function hasClass(obj, classN) {
	var reCN = obj.className.match(new RegExp(' ?' + classN + ' ?'));
	if (reCN) return true;
	else return false;
}

function nextSiblingElement(obj) {
	var sibling = obj.nextSibling;
	if (!sibling) return null;
	if (sibling.nodeType == 3) return sibling.nextSibling;
}

var tables = document.getElementById('content-td').getElementsByTagName('table');

for (var i=0, j=tables.length; i<j; i++) {
	if (tables[i].id.indexOf('tracks::') == 0) {
		// ok, this is a release table
		var rows = tables[i].getElementsByTagName('tr');
		for (var k=0, l=rows.length; k<l; k++) {
			var rowClass = rows[k].className;
			if (!showsAll && rowClass != 'track') continue;
			if (showsAll && rowClass != 'track highlight') continue;
			
			var theCell = rows[k].getElementsByTagName('td').item(1);
			// a small assertion
			if (!hasClass(theCell, 'title')) continue;
			
			var theTrack = theCell.getElementsByTagName('a').item(0);
			var removeLink = prepRemoveLink(theTrack.href);

			// if it's VA then it also has an artist cell. place it there..
			if (hasClass(theCell, 'va')) theCell = nextSiblingElement(theCell);

			theCell.insertBefore(removeLink, theCell.firstChild);
		}
	}
}
