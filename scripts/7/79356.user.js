// ==UserScript==
// @name Facey-Space Officializer
// @description Replaces the facebook logo with the facey-space logo
// @match http://*.facebook.com/*
// @include http://*.facebook.com/*
// ==/UserScript==

document.getElementById('pageLogo').firstChild.style.backgroundImage = 'url("http://i5.photobucket.com/albums/y177/matt72186/faceyspace.png")';
document.getElementById('pageLogo').firstChild.style.backgroundPosition = "center center";