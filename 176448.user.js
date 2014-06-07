// ==UserScript==
// @name        imgur mobile non annoy
// @namespace   treas0n
// @include     http://*imgur.com/*
// @version     1.0.0
// ==/UserScript==

var v = "1.0.0";

//loads all images
Imgur.View.Album.maxDisplay = 1000;
Imgur.Mobile.renderLimit = 1000;
(function($) {
	$.inviewport = function(element, settings) {
		return true;
	};
})(jQuery);

//kills UI elements
addGlobalStyle('.loader-container { visibility: hidden ! important; }'); //spinner when swipe occurs
addGlobalStyle('.swipe-arrow { visibility: hidden ! important; }'); //green swipe left/right
addGlobalStyle('#header { visibility: hidden !important; height: 0px !important; display: none !important; }'); //top nav
addGlobalStyle('.contextOverlay { visibility: hidden ! important; }'); //floating blue arrow at right
addGlobalStyle('.page-container { padding-top: 0px !important }'); //push image to top

//disables side swiping
Imgur.Collection = null;
Imgur.View.Gallery = null;
Imgur.View.GalleryCarousel = null;

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}