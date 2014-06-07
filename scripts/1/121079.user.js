// ==UserScript==
// @name          Uzi's Image Dimensions - General
// @namespace     Uzi/xmbimagedimensions
// @description   Gives image dimensions on mouseover.
// @include       http://xboxmb.com/*
// @include       http://www.xboxmb.com/*
// @version 	  1.0
// ==/UserScript==

window.onload = function() {
	var imgs = document.getElementsByTagName('img');
	var element;
        var img;
	for ( var i = 0; i < imgs.length; i++ ) {
		element = imgs[i];
			img = new Image();
	        img.src = element.src;
			element.title = img.width + ' x ' + img.height;
	}
}