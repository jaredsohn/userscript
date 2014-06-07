
// ==UserScript==
// @name        Instagram Image Fix
// @namespace   se.vemihelvete.InstagramImageFix
// @description Makes Instagram images show as a visible img-tag instead of a background-image.
// @updateURL   http://userscripts.org/scripts/source/147227.user.js
// @include     http://instagram.com/p/*
// @grant       none
// @version     0.4
// ==/UserScript==

var arrPhotos = new Array();
var arrViewport = document.getElementsByName('viewport');
var parentNode = document.getElementById('media_photo');

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

if (arrViewport.length > 0) {
	arrViewport[0].setAttribute('content','width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=8.0, user-scalable=yes');
}

if (parentNode != null) {
    parentNode.style.display = 'inline';
    arrPhotos = getElementsByClass('photo',parentNode,'img');
    if (arrPhotos.length > 0) {
        arrPhotos[0].style.visibility = 'visible';
    }
}
