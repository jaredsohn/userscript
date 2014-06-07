// ==UserScript==
// @name           Flickr Gallery Plus!
// @namespace      robertnyman.com
// @description    Improve Flickr photo set viewing
// @include        http://www.flickr.com/photos/*/sets/*/
// @include        http://flickr.com/photos/*/sets/*/
// ==/UserScript==
var flickrGalleryPlusLoader = function () {
	var scripLocation = "http://flickrgalleryplus.googlecode.com/svn/branches/live/flickrGalleryPlus.js";
		
	init = function () {
		var head = document.getElementsByTagName("head")[0],
			script;
		if (head) {
			script = document.createElement("script");
			script.src = scripLocation;
			script.type = "text/javascript";
			head.appendChild(script);
		}
	};
	
	return {
		init : init
	};
}();
flickrGalleryPlusLoader.init();