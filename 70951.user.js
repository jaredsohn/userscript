// ==UserScript==
// @name           wallbase image opener
// @namespace      http://jjogi.de/
// @version        0.2
// @description    this short script opens the images directly on wallbase
// @include        http://wallbase.cc/wallpaper/*
// ==/UserScript==

var re = new RegExp( 'http://wallpapers\.wallbase\.cc/[a-z\-]+/wallpaper-[0-9]+\.(jpg|png)' );
document.location = document.documentElement.outerHTML.match( re )[0];