// ==UserScript==
// @name        Access YouTube by Proxy Site
// @namespace   Luqman
// @description Access YouTube Links automatically by unblockyoutube.pk
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1
// ==/UserScript==

var URL = "http://www.unblockyoutube.pk/browse.php?u=" + location.href;
window.location = URL;