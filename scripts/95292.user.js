// ==UserScript==
// @name           Backpage Enlarge Images
// @namespace      backpage_enlarge
// @description    Enlarges all thumbnails on backpage to use the larger images on the ad page.
// @include        http://*.backpage.com/*/*
// @exclude        http://*.backpage.com/classifieds/*
// ==/UserScript==

// ==UserScript==
// @name           Webshot Gallery Fixer
// @namespace      WGF
// @description    Fixes webshot galleries
// @include        http://*.webshots.com/*
// ==/UserScript==

var links = document.getElementsByTagName("img"); //array
var mregex = /^http:\/\/([^\.]+).backpage.com\/([^\/]+)\/([^\/]+)\/medium\/([^$]+)/i;
var rregex = /^http:\/\/([^\.]+).backpage.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^$]+)/i;
for (var i=0,imax=links.length; i<imax; i++) {
  if (links[i].parentNode.getAttribute('href') != null && links[i].src.match(mregex)) {
   links[i].src = links[i].src.replace(rregex,"http://$1.backpage.com/$2/$3/large/$5");
   links[i].removeAttribute('width');
   links[i].removeAttribute('height');
  }
}

