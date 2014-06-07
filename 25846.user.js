// ==UserScript==
// @name           Image title captions
// @url            http://userscripts.org/scripts/source/?.user.js
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Shows image title attributes as captions below the largest image on sites you @include this script at. By default only invokes at xkcd.com and Dinosaur Comics, qwantz.com.
// @include        http://qwantz.com/*
// @include        http://xkcd.com/*
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @xpath+ images: //img[@title] | //a[@title]/img
// ==/UserScript==

window.addEventListener("load", subtitleBiggestImage, false);

function subtitleBiggestImage() {
	var imgs = $x('//img[@title] | //a[@title]/img');
	var img, i, biggest, a, area = 0;
	for (i = 0; img = imgs[i]; i++) {
		a = img.width * img.height;
		if (a > area) {
			area = a;
			biggest = img;
		}
	}
	biggest && showCaption( biggest );
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
	var title = img.title || img.parentNode.title;
	var div = document.createElement( "div" );
	div.innerHTML = title.replace( /([&-\/])/g, "$1<wbr />" );
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