// ==UserScript==
// @name          Flickr Spaceball Killer
// @description	  Enables right-clicking on images on Flickr. (In the 'all sizes' page and the lightbox zoom, but not the photo page itself.)(Working as of Flickr redesign of June 2010)
// @namespace     http://www.rhyley.org/gm/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// By Jason Rhyley (jason AT rhyley DOT org)
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.setAttribute('type','text/css'); 
	kil.appendChild(document.createTextNode('.spaceball {display:none !important;} .facade-of-protection {display:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();
