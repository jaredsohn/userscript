// Don't you hate that puny add edit note box?
// version 0.1, 2008-05-29
//
// Copyright (c) 2008, Ionut Ciocirlan
// You can use this code under the GPL license, version 3 or later.
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          MusicBrainz puny edit note textarea fixer
// @description   Makes the edit note textarea fill the available page size
// @include       http://musicbrainz.org/mod/addnote.html?*
// ==/UserScript==

var docSize = document.getElementsByTagName('html')[0].offsetHeight;

var noteArea = document.getElementById('notetext');
var originalSize = noteArea.clientHeight;

var reservedSize = docSize - originalSize;

function doResize() {
	var fullSize = window.innerHeight;
	// don't resize if it gets smaller..
	if (fullSize - reservedSize > originalSize)
		noteArea.style.height = (fullSize - reservedSize) + 'px';
}

window.addEventListener('load', doResize, true);
window.addEventListener('resize', doResize, true);
