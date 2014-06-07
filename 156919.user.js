/*
Flickr remove spaceball
Version 0.1
*/

// ==UserScript==
// @name          Flickr remove spaceball
// @description   Removes the empty image (download deterrent) positioned over some photos on Flickr
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @include       https://secure.flickr.com/photos/*
// ==/UserScript==

var spaceball = document.getElementsByClassName("spaceball")[0];
if(spaceball) {
    spaceball.style.display = 'none';
}
