// ==UserScript==
// @name Stop Search Grab
// @namespace     
// @description A script for myspace which stops the new search box from grabbing focus.
// @include       http://*myspace.com/*
// ==/UserScript==
(document.getElementById('q'))?document.getElementById('q').blur():function() {return false;};
