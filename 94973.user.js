// Ovid straight to pdf
// 2011-01-20
// Copyright (c) 2011, Jason Friedman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name Ovid straight to pdf
// @namespace http://www.curiousjason.com/greasemonkey/
// @description Open a pdf in a full browser tab rather than inside a frame on the ovid website 
// @include http://ovidsp.tx.ovid.com*/*pdf_key*
// ==/UserScript==

// Find the link to the pdf from the iframe
var iframe = document.getElementById('embedded-frame');

// Redirect the page to there
window.location.href = iframe.src;
