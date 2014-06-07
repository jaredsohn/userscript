// ==UserScript==
// @name           Imagebam just picture
// @namespace      http://www.imagebam.com/image/*
// @include        http://www.imagebam.com/image/*
// @description    Removes ads and unneeded clicks.
// ==/UserScript==

var path_name=window.location.pathname ;
var image_id = "i"+path_name.substr(path_name.length - 9);

var image_src = document.getElementById(image_id).src;

document.body.innerHTML = '<img src="'+image_src+'">';