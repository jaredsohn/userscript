// ==UserScript==
// @name           Flickr Logo Cleaner
// @namespace      http://twitter.com/jyuan
// @description    Covers the 'from Yahoo!' text in the logo
// @version        0.1
// @include        http://flickr.com/*
// @include        http://www.flickr.com/*
// ==/UserScript==

var logo = document.getElementById('FlickrLogo');
var cover = document.createElement('div');
cover.style.backgroundColor = 'white';
cover.style.width = '90px';
cover.style.height = '11px';
cover.style.marginLeft = '95px';
cover.style.marginTop = '19px';
cover.style.position = 'relative';
logo.parentNode.parentNode.insertBefore(cover, logo.parentNode.nextSibling);