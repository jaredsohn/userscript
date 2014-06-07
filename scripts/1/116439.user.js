// ==UserScript==
// @name          xerotic's Image Dimensions -Firefox
// @namespace     xerotic/hfimagedimensions
// @description   Gives image dimensions on mouseover for FF
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 	  1.0
// ==/UserScript==


function init() {
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

if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", init, false);
}