// ==UserScript==
// @name           Flickr logo
// @description    Replace the dodgy Flickr/Yahoo! logo by hiding the Yahoo bit
// @include        http://www.flickr.com/*
// @match        http://www.flickr.com/*
// ==/UserScript==

var logo = document.getElementById('FlickrLogo');
if (logo) {
  var over = document.createElement('div'); 
  over.style.left = '100px';
  over.style.height = '15px';
  over.style.width = '100px';
  over.style.top = '18px';
  over.style.background = '#fff'; 
  over.style.position = 'relative';
  logo.parentNode.parentNode.appendChild(over);
}