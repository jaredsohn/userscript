// ==UserScript==
// @name           WebAssign Link Fix
// @namespace      http://freecog.net/2010/
// @description    Fixes JavaScript links to not jump to the top of the page when clicked.
// @include        http://webassign.net/*
// @include        http://www.webassign.net/*
// @include        https://webassign.net/*
// @include        https://www.webassign.net/*
// ==/UserScript==

Array.forEach(document.getElementsByTagName('a'), function(a) {
    if (a.getAttribute('href') === '#') {
        a.href = 'javascript:void(0);';
    }
});
