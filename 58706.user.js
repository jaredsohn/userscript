// ==UserScript==
// @name           Flickr Logo Uncrap-r
// @description    Restores the original Flickr logo.
// @namespace      http://claude.betancourt.us/greasemonkey/flickr/logo-uncrapr/1.0.0
// @include        http://flickr.com/*
// @include        http://www.flickr.com/*
// ==/UserScript==
var goodLogo = 'http://cdn.betancourt.us/claude/images/blog/assets/flickr-not-so-shitty-logo.png';
document.getElementById('FlickrLogo').src = goodLogo;
