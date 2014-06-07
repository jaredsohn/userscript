// ==UserScript==
// @name           FlickrBiggr
// @namespace      craigmunro.net
// @description    Increase the default image size to Large when viewing a photo on Flickr
// @include		http://flickr.com/photos/*
// @include		http://www.flickr.com/photos/*
// ==/UserScript==
var flickrBiggrLoadr = function ()
{
	var scripLocation = "http://www.craigmunro.net/FlickrBiggr.user.js";
		
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
flickrBiggrLoadr.init(); 