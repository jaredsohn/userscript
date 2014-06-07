// ==UserScript==
// @name           NUMA Top Navigation
// @include        http://www.nmaps.net/*
// @exclude        http://www.nmaps.net/browse?*q=$watch*
// ==/UserScript==

fs = document.getElementsByClassName("section")[0];
fs.parentNode.insertBefore(document.getElementById("browsenext").cloneNode(true), fs);
fs.parentNode.insertBefore(document.getElementById("browseprev").cloneNode(true), fs);