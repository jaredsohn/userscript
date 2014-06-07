// ==UserScript==
// @name       TS Playground - Open photo in new tab.
// @namespace  http://userscripts.org/scripts/show/185161
// @grant      unsafeWindow
// @version    0.1
// @description  Removes lightbox (PrettyPhoto) from opening and opens all images in a new tab.
// @match      http://members.tsplayground.com/*/*/pictures/*
// @match      http://members.tsplayground.com/*/*/screenshots/*
// @copyright  2013+, SebX
// ==/UserScript==

$.fn.noPrettyPhoto = function () {
    this.unbind(); 
    this.live('click', function() {
    	window.open($(this).attr('href'));
    	return false;
    });
};

$('.photoset li a, .screenshot li a').noPrettyPhoto();