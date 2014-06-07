// ==UserScript==
// @name           Hide recommended gallery on Allegro
// @namespace      yf.greasemonkey
// @description    Get rid of the annoying thing on allegro
// @include        *allegro.pl*
// ==/UserScript==
document.getElementById("rgSlideShow").style.display = "none";