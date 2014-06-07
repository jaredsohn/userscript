// Gallery Direct
// version 0.1
// 2008-03-13
// Copyright (c) 2008, poetic scarecrow
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name         Gallery Direct
// @namespace    about:blank
// @description  In Galleries powered by http://gallery.sourceforge.net/, the thumbnails will link directly to the image, instead of linking to an HTML page which contains it.
// @include      */v/*
// ==/UserScript==

GalleryDirect = function() {
	var elements = getElementsByClass('giThumbnail', document.getElementById('gsThumbMatrix'));
	for each (el in elements) {
		var link = el.getAttribute('src');
		var linkArray = link.split('/');
		var numbers = linkArray[linkArray.length-2].split('-');
		numbers[0]--;
		numbers[1]--;
		linkArray[linkArray.length-2] = numbers.join('-');
		link = linkArray.join('/');
		el.parentNode.setAttribute('href', link);
	}
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

GalleryDirect();