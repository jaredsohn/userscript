// ==UserScript==
// @name           Flickr-dehoo
// @namespace      http://flambeedyak.net/gmscripts
// @author         drew robinson
// @description    All old-skool Flickr logo, no boo-hoo.
// @version        0.0.1
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==

var img = document.getElementById("FlickrLogo")
img.src = "http://fygfiles.appspot.com/img/flickr-logo.png"
