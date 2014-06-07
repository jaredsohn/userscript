// Fixa till Aftonbladet user script
// Version 1.2
// 2006-06-30
// Copyright (c) Mikael Palo
//
// This is a Greasemonkey script which fixes some annoying things with the Aftonbladet site
//
// ==UserScript==
// @name	Aftonbladet fixa till
// @description	Removes job ads and ad for blocket. These were not possible to filter with AdBlock
// @include	http://www.aftonbladet.se/*
// ==/UserScript==
//
var adSidebar = document.getElementById('jobads');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
//
var adsearchbar = document.getElementById('jobb24searchbox');
if (adsearchbar) {
    adsearchbar.parentNode.removeChild(adsearchbar);
}
//
var adfooterbar = document.getElementById('jobb24footer');
if (adfooterbar) {
    adfooterbar.parentNode.removeChild(adfooterbar);
}
//
var adBlocket = document.getElementById('blocketnav');
if (adBlocket) {
    adBlocket.parentNode.removeChild(adBlocket);
}
//
var adschl = document.getElementById('jobb');
if (jobb) {
    jobb.parentNode.removeChild(jobb);
}
//
var adjobb = document.getElementById('jobbheadline');
if (jobbheadline) {
    jobbheadline.parentNode.removeChild(jobbheadline);
}


