// ==UserScript==
// @name             babs71.livejournal.com image resizer
// @author           kost
// @version          0.0.0.5
// @description      Shows bigger photos in babs71.livejournal.com blog posts
// @include          *babs71.livejournal.com*
// ==/UserScript==

function replaceImages() {
	var i, yandex_images = [], L=document.images.length;

	for(i=0;i<L;++i){
		src = document.images[i].src;
		if (src.match(/fotki\.yandex\.ru/)) {
			yandex_images.push(document.images[i]);
		}
	}

	YL = yandex_images.length;
	for(i=0; i < YL; ++i){
		src = yandex_images[i].src;
	 	yandex_images[i].src = src.replace(/_[M|L]\.jpg/g,"_XL.jpg");
	 	yandex_images[i].style.display = 'block';
	 	yandex_images[i].style.margin = '1em 0';
	 	yandex_images[i].style.border = 'double 3px #ccc';
	}
}

if( /opera/.test(navigator.userAgent.toLowerCase()) ) {
	document.addEventListener("DOMContentLoaded", function(){ replaceImages(); }, false);
} else {
	replaceImages();
}
