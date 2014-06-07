// ==UserScript==
// @name        Magnet Re-write
// @namespace   RandomHelper
// @description Strips trackers from magnet links
// @include     http*://*
// ==/UserScript==


var links = document.getElementsByTagName("a");
var regex= /^magnet(.+)(dn=.+)$/i;
for (var i=0,max=links.length; i<max; i++) {
    links[i].href=links[i].href.replace(regex,"magnet$1");
}