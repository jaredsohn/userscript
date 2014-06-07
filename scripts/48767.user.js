// ==UserScript==
// @name          Pierwszy
// @description   Uczę się tutaj
// @include       http://*occ24.com/*
// @exclude       http://*occ24.*/?o=sitemap
// @exclude       http://*occ24.*/index.php?o=sitemap

// ==/UserScript==

var theImage, altText;
theImage = document.getElementById('annoyingsmily');
if (theImage) {
    altText = document.createTextNode(theImage.alt);
    theImage.parentNode.replaceChild(altText, theImage);
}