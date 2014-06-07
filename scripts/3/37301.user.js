// ==UserScript==
// @name           Link Flickr images to Flickr photo page
// @namespace      http://userscripts.org/users/40332
// @description    All images from Flickr will be linked back to their Flickr page (if they are not currently linked elsewhere).
// @include        http://forum.manualfocus.org/viewtopic*
// ==/UserScript==

var regExpr = /.*flickr\.com/i;
images = document.getElementsByTagName('img');
for (var idx=0; idx < images.length; idx++) {
    image = images[idx];
    if (regExpr.exec(image.src) && ! image.parentNode.href) {
	   a = document.createElement('a');
	   a.href = srcToURL(image.src);
	   a.innerHTML = "<img class='posting' src='"+ image.src +"'>";
	   image.parentNode.insertBefore(a, image);
	   image.parentNode.removeChild(image);
	}
}

function srcToURL( src ) {
	var url = 'http://flickr.com/photo.gne?id=';
	url += src.substring( src.lastIndexOf('/',src)+1, src.indexOf('_',src) );
	url += '/';
	return url;
}
