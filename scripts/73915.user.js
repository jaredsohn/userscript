// ==UserScript==
// @name        Soup Picture Size
// @author      Kambfhase
// @description Removes size restriction on pictures
// @include     http://*.soup.io/*
// @contributor tschy2m
// @contributor Teufel
// ==/UserScript==

Array.forEach(document.getElementsByTagName("a"), function(e) {
    e.href = e.href.replace(/_\d{3,}\.(jpe?g|gif|png)$/i, ".$1");
});

