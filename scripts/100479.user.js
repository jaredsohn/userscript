// ==UserScript==
// @name           Dicepool.com Large Images
// @namespace      http://freecog.net/2010/
// @description    Replace thumbnails with full-size images.
// @include        http://dicepool.com/*
// @include        http://www.dicepool.com/*
// ==/UserScript==

Array.forEach(document.getElementsByTagName('img'), function(img) {
	var oldSrc = img.src;
	img.removeAttribute('width');
	img.removeAttribute('height');
	img.addEventListener('error', function onerror() {
		// Some dice have images in the Chessex subdirectory
		img.removeEventListener('error', onerror, false);
		img.addEventListener('error', function() {
			// None of our guesses worked... oh well.
			img.src = oldSrc;
		}, false);
		img.src = oldSrc.replace(/(uploads\/)thumbs\/thumb_(.*)$/, '$1chessex/$2');
	}, false);
	img.src = oldSrc.replace(/(uploads\/)thumbs\/thumb_(.*)$/, '$1$2');
});