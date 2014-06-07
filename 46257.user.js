// ==UserScript==
// @name           Flickr Easy Grab
// @namespace      http://www.info.unicaen.fr/~amignon/
// @description    Makes an image address available by right click.
// @include        http:*flickr.com/photos/*
// @include        http:*flickr.com/search/*
// @include        http:*flickr.com/groups/*/pool/*
// ==/UserScript==

imgs = document.getElementsByTagName('img')
for (var i=0; i<imgs.length; i++){
	if (imgs[i].src=="http://l.yimg.com/g/images/spaceball.gif"){
		img = imgs[i];
		img.src = imgs[i-1].src;
		img.style.zIndex = 1000;
	}
}