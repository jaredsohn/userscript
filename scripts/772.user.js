// ==UserScript==
// @name        The Pirate Bay Frame "Remover"
// @description "Gets rid" of the annoying frame on the right.
// @include     http://thepiratebay.org/frame.html
// @include	http://*.thepiratebay.org/frame.html
// @include     http://piratebay.org/frame.html
// @include     http://*.piratebay.org/frame.html
// ==/UserScript==
//
// This program doesn't actually get rid of the frame, rather it makes the width of it 0

(function() {
document.body.cols = "*,0,0,0";
})();
