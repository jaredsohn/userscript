// ==UserScript==
// @name           last.fm album art zoom
// @namespace      namespace
// @description    On album page click the cover to enlarge the image.
// @include        http://*.last.fm/music/*
// @include        http://www.lastfm.*/music/*
// ==/UserScript==

var cover, img, img2, lcase, url;

if ((cover = document.getElementById('albumCover')) &&
	(img = cover.getElementsByTagName('img')[0]) &&
	(lcase = cover.getElementsByTagName('span')[0])) {
		lcase.style.cursor = 'pointer';
		lcase.addEventListener('click', function() {
			if (!img2) {
				img2 = document.createElement('img');
				img2.src = img.src.replace(/\/174s\//, '/300x300/');
				img2.width = 450;
				img2.style.position = 'absolute';
				img2.style.top = '42px';
				img2.style.zIndex = 1000000;
				img2.addEventListener('click', function() {
					document.getElementById('page').removeChild(img2);
				}, false);
			}
			document.getElementById('page').appendChild(img2);
	}, false);
}