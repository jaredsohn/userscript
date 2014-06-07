// ==UserScript==
// @name           Remove "Friends" bar - Youtube
// @namespace      http://chartreuse.shell.tor.hu/
// @description    Remove the annoying (to me) "Friends" bar at the bottom of the screen
// @include        http://www.youtube.com/*
// @include        http://*.youtube.com/*
// @include        http://*.youtube.*/*
// ==/UserScript==
var toolbar_element = document.getElementById('toolbar_preload');
if (toolbar_element) {
    toolbar_element.parentNode.removeChild(toolbar_element);
}