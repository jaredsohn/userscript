// ==UserScript==
// @name           Imagebam view picture
// @namespace      http://www.imagebam.com/image/*
// @include        http://www.imagebam.com/image/*
// @description    Cleans the clutter on imagebam picture pages.
// ==/UserScript==

var sImgSrc = document.getElementById('the_image').src;
document.body.innerHTML = '<img src="'+sImgSrc+'">';