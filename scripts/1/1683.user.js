// Fixa till Aftonbladet user script
// Version 1.0
// 2005-08-13
// Copyright (c) Bengt Alverborg
//
// This is a Greasemonkey script which fixes some annoying things with the Aftonbladet site
//
// ==UserScript==
// @name	Aftonbladet fixa till
// @description	Removes job ads and ad for blocket. These were not possible to filter with AdBlock
// @include	http://www.aftonbladet.se/*
// ==/UserScript==
//
var adSidebar = document.getElementById('annonshspalt');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
//
var adBlocket = document.getElementById('blocketnav');
if (adBlocket) {
    adBlocket.parentNode.removeChild(adBlocket);
}
