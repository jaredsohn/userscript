// ==UserScript==
// @name           Image title captions
// @url            http://userscripts.org/scripts/source/11174.user.js
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Shows image title attributes as captions below the largest image on sites you @include this script at. By default only invokes at xkcd.com and Dinosaur Comics, qwantz.com.
// @include        http://qwantz.com/*
// @include        http://xkcd.com/*
// @xpath+ images: //img[@title]
// ==/UserScript==

if( typeof xpath == "undefined" )
  xpath = { images: $x("//img[@title]") };

window.addEventListener( "load", subtitleBiggestImage, false );

function subtitleBiggestImage() {
	var imgs = xpath.images, img, i, biggest, a, area = 0;
	for (i = 0; img = imgs[i]; i++) {
		a = img.width * img.height;
		if (a > area) {
			area = a;
			biggest = img;
		}
	}
	showCaption( biggest );
}

function getPos( node ) {
	var x = node.offsetLeft, y = node.offsetTop;
	while (node = node.offsetParent) {
		x += node.offsetLeft;
		y += node.offsetTop;
	}
	return { x:x, y:y };
}

function showCaption( img ) {
	var div = document.createElement( "div" );
	div.innerHTML = img.title.replace( /([&-/])/g, "$1<wbr />" );
	document.body.appendChild( div );
	div.style.position = "absolute";

	// break it into lines of approximately equal length, for nicer looks:
	var w = img.width;
	div.style.width = w + "px"; // start conditions: text as wide as image
	var h = div.offsetHeight; // optimize caption width within a constant h:
	var lower = 0, pivot = w >> 1, upper = w;
	while (lower < pivot && upper > pivot) {
		div.style.width = pivot + "px";
		if (div.offsetHeight == h) {
			upper = pivot;
			if (upper - lower < 2) break;
		} else {
			lower = pivot+1;
		}
		pivot = (upper + lower) >> 1 + (upper - lower==1);
		// console.log( lower, pivot, upper );
	}
	div.style.width = upper + "px";

	var pos = getPos( img );
	pos.x += (img.offsetWidth - div.offsetWidth) / 2;
	pos.y += img.offsetHeight + 10;

	div.style.left = pos.x + "px";
	div.style.top = pos.y + "px";
	img.style.paddingBottom = (10+div.offsetHeight) + "px";
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
        var res = [];
	switch( got.resultType ) {
		case got.STRING_TYPE:	return got.stringValue;
		case got.NUMBER_TYPE:	return got.numberValue;
		case got.BOOLEAN_TYPE:	return got.booleanValue;
		default:		while( next = got.iterateNext() )
						res.push( next );
					return res;
	}
}
