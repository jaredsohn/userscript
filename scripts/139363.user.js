// ==UserScript==
// @name        Flickr set view 150x150 thumbnails
// @namespace   Bushman.K
// @description Makes Thumbnail view on Flickr using large 150x150 "q"-size thumbnails in six columns
// @include     http://www.flickr.com/photos/*/sets/*
// @include     https://secure.flickr.com/photos/*/sets/*
// @include     https://www.flickr.com/photos/*/sets/*
// @version     1.3
// @grant GM_addStyle
// ==/UserScript==
var images = document.getElementsByTagName('img');
for (i=0; i<images.length; i++) {
images[i].src = images[i].src.replace(/_s.jpg/,"_q.jpg");
}
GM_addStyle(".pc_s .pc_img {width:150px; height:150px;}  #main {width:1192px;}  #SubNav {width:100% !important;} .Sets.whitespaceless {width:120px; padding-right:6px;}");