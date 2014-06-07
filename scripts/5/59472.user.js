// ==UserScript==
// @name           svz photo downloader
// @namespace      schloss-einstein-girls.info/gmscripts
// @description    adds a link to the actual photo URL to easily download a photo from schuelerVZ/studiVZ
// @include        http://www.schuelervz.net/Photos/Album/*
// @include        http://www.schuelervz.net/Photos/Tags/*
// @include        http://www.schuelervz.net/Photos/View/*
// @include        http://www.studivz.net/Photos/Album/*
// @include        http://www.studivz.net/Photos/Tags/*
// @include        http://www.studivz.net/Photos/View/*
// @version        1.0.1
// @copyright 2009+, Stefan T. (http://www.schloss-einstein-girls.info),
// @contributor Jens Kohl (jens.kohl+greasemonky AT gmail DOT com)
// ==/UserScript==

// display link only if photo is visible
if (document.getElementById('accusePhotoLink')) {
	// finde abuse link
	var container = document.getElementById('accusePhotoLink');
	
	// link to photo
	var link = document.createElement('span');
	link.innerHTML = '&nbsp;<a href="'+document.getElementById('PhotoContainer').childNodes[0].src+'" accesskey="s">Foto herunterladen</a> | ';
	document.getElementById('PhotoContainer').childNodes[0].setAttribute('onmousedown', '');

	container.parentNode.insertBefore(link, container);
}
