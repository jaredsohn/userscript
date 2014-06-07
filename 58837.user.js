// ==UserScript==
// @name           flickr ad remover 
// @namespace      flickrAdRemove
// @description    removes ad from the photo page
// @include        http://www.flickr.com/*
// ==/UserScript==
var ads = document.getElementsByClassName('ad_hb');
for (var i=0;i<ads.length;i++) {
    ads[i].style.display = 'none';
}