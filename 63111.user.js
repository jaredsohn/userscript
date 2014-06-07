// ==UserScript==
// @name           hs.fi tagcloud remove
// @namespace      http://userscripts.org/users/glauri
// @description    removes tagcloud from hs.fi
// @include        http://www.hs.fi/*
// ==/UserScript==

var tag1 = document.getElementById('xlist_Yleinen_hakusana_tagipilvi');
var tag2 = document.getElementById('xlist_Yleinen_hakusana_tagipilvi_kapea');
if (tag1) {
    tag1.parentNode.removeChild(tag1);
}
if (tag2) {
    tag2.parentNode.removeChild(tag2);
}
