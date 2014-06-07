// ==UserScript==
// @name           Del.icio.us Hide Friend Tags
// @namespace      http://e5media.com
// @description    Hides tags that start with "for:" from your tag cloud
// @include        http://del.icio.us/*
// ==/UserScript==


var mytags = document.getElementsByTagName('a')

if (mytags) {
  for (tag in mytags) {
    if (mytags[tag].toString().search(/for:/) != -1) {
      mytags[tag].style.display='none';
    }
  }
}