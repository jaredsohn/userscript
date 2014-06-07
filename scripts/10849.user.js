// ==UserScript==
// @name           hover in peace
// @namespace      Dim
// @description    Kill any mouseover/hover events; useful for ignoring snap previews
// @include        http://*.wordpress.com/*
// @include        http://*.cafe.marker.com/*
// @include        http://*.blogli.co.il/*
// ==/UserScript==

// Trivial code adapted from diveintogreasemonkey.org
// See here: http://diveintogreasemonkey.org/patterns/intercept-clicks.html

document.addEventListener('mouseover', function(event) {
    event.stopPropagation();
    event.preventDefault();
}, true);

